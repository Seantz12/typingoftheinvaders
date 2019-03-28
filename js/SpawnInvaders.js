class Invader extends HTMLElement {
    constructor() {
        super();
        if(typeof Invader.count == 'undefined') {
            Invader.count = 0;
            Invader.speed = 10;
        } else {
            Invader.count++;
        }
        this.wordThing = "invaders" + Invader.count;
        const shadow = this.attachShadow({mode: 'open'});
        var text = document.createTextNode(this.wordThing);
        shadow.appendChild(text);
        // does nothing else
    }

    connectedCallback() {
        this.setAttribute('id', this.key);
        this.style.position = 'absolute';
        this.style.top = '0px';
        this.style.left = '500px'
        this.x = 500;
        this.startMove();
    }

    startMove() {
        var thisElement = document.getElementById(this.key);
        var startX = this.x;
        var pos = 0;
        var id = setInterval(move, Invader.speed);
        function move() {
            if(pos == 500) {
                try {
                    thisElement.parentNode.removeChild(thisElement);
                    clearInterval(id);
                } catch(error) {
                    return;
                }
            } else {
                pos++;
                thisElement.style.top =  pos + 'px';
                // thisElement.style.left = startX + pos + 'px';
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