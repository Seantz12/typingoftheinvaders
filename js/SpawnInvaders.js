class Invader extends HTMLElement {
    constructor() {
        super();

        if(typeof Invader.count == 'undefined') Invader.count = 0;
        else Invader.count++;
        this.wordThing = "invaders" + Invader.count;
        const shadow = this.attachShadow({mode: 'open'});
        var text = document.createTextNode(this.wordThing);
        shadow.appendChild(text);
        // does nothing else
    }

    connectedCallback() {
        this.setAttribute('id', this.key);
        this.style.position = 'absolute';
        this.startMove();
        console.log("element created!");
    }

    startMove() {
        var thisElement = document.getElementById(this.key);
        console.log('time to move');
        var pos = 0;
        var id = setInterval(move, 5);
        function move() {
            if(pos == 500) {
                thisElement.parentNode.removeChild(thisElement);
                clearInterval(id);
            } else {
                pos++;
                thisElement.style.top = pos + 'px';
                thisElement.style.left = pos + 'px';
            }
        }
    }

    get key() {
        return this.wordThing
    }
}
window.customElements.define('invader-element', Invader)

function spawn() {
    var element = document.getElementById('invaderSpawn');
    var test = document.createElement('invader-element');
    element.appendChild(test);
}