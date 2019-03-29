var wordArray;
var fs;
fetch('js/words.txt').then(response => response.text()).then(text => wordArray=text.split('\n'));

class Invader extends HTMLElement {
    constructor() {
        super();
        if(typeof Invader.hit == 'undefined') {
            Invader.hit = 0;
            Invader.speed = 10;
        } 
        if (Invader.hit % 10 == 0 && Invader.speed > 2) {
            Invader.speed -= 2;
        }
        var randomIndex = Math.floor(Math.random() * wordArray.length);
        this.wordThing = wordArray[randomIndex];
        this.direction = Math.random() < 0.5 ? -1 : 1;
        const shadow = this.attachShadow({mode: 'open'});
        var text = document.createTextNode(this.wordThing);
        shadow.appendChild(text);
    }

    connectedCallback() {
        this.setAttribute('id', this.key);
        this.style.position = 'absolute';
        this.style.top = '0px';
        this.style.left = '500px'
        this.y = 0;
        this.x = Math.floor(Math.random() * window.innerWidth);
        this.startMove();
    }

    disconnectedCallback() {
        Invader.hit++;
        console.log("i've been removed!");
        console.log(Invader.hit);
        if(Invader.hit == 15) {
            console.log('hello?');
            window.postMessage('winner!');
        }
    }

    startMove() {
        var thisElement = document.getElementById(this.key);
        var y = this.y
        var x = this.x;
        var direction = this.direction;
        var id = setInterval(move, Invader.speed);
        function move() {
            if(y >= 500) {
                try {
                    thisElement.parentNode.removeChild(thisElement);
                } catch(error) {
                    return;
                }
                window.postMessage('game over man');
                clearInterval(id);
            } else {
                y++;
                x = x + direction;
                thisElement.style.top = y + 'px';
                thisElement.style.left = x + 'px';
                if((x > window.innerWidth) || (x < 0)) {
                    direction *= -1;
                }
            }
        }
    }

    get key() {
        return this.wordThing
    }
}
window.customElements.define('invader-element', Invader)

function spawn() {
    var spawned = 0;
    if(spawned <= 15) {
        var element = document.getElementById('invaderSpawn');
        var test = document.createElement('invader-element');
        element.appendChild(test);
    }
}
