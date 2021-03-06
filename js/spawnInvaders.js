class InvaderSpawner {
    constructor() {
        this.count = 0;
        this.speed = 0;
        this.hit = 0;
        this.intervalId;
        console.log('created');
    }

    startSpawning() {
        this.intervalId = setInterval(this.spawn, SPAWN_RATE);
    }

    stopSpawning() {
        clearInterval(this.intervalId);
    }

    spawn() {
        var element = document.getElementById('invaderSpawn');
        var test = new Invader()
        element.appendChild(test);
    }
}

class Invader extends HTMLElement {
    constructor() {
        super();
        if(typeof Invader.count == 'undefined') {
            Invader.count = 0;
            Invader.speed = 10;
            Invader.hit = 0;
        } 
        if (Invader.count % DIFFICULTY_INCREMENT == 0 && Invader.speed > SPEED_INCREASE_RATE) {
            console.log('speed up!!!!!');
            Invader.speed -= SPEED_INCREASE_RATE;
        }
        var randomIndex = Math.floor(Math.random() * wordArray.length);
        this.wordThing = wordArray[randomIndex];
        this.direction = Math.random() < 0.5 ? -1 : 1;
        this.interval;
        const shadow = this.attachShadow({mode: 'open'});
        var text = document.createTextNode(this.wordThing);
        shadow.appendChild(text);
        var image = document.createElement('img');
        if(special) {
            image.src = 'css/images/Adblock_logo.png';
        } else {
            image.src = 'css/images/alien.png';
        }
        image.alt = 'Error!';
        image.style.display = 'block';
        image.style.width = '50%';
        image.style.margin = 'auto';
        shadow.appendChild(image);
    }

    // On creation of custom element
    connectedCallback() {
        console.log(this.key);
        this.setAttribute('id', this.key);
        Invader.count++; 
        this.style.position = 'absolute';
        this.style.top = '0px';
        this.style.left = '500px'
        this.y = 0;
        this.x = Math.floor(Math.random() * (window.innerWidth - this.offsetWidth - 50));
        this.startMove();
    }

    // On deletion of custom element
    disconnectedCallback() {
        clearInterval(this.interval);
    }

    startMove() {
        var thisElement = document.getElementById(this.key);
        var y = this.y
        var x = this.x;
        var direction = this.direction;
        this.interval = setInterval(move, Invader.speed);
        function move() {
            if(y >= (window.innerHeight - 100)) {
                try {
                    thisElement.parentNode.removeChild(thisElement);
                } catch(error) {
                    return;
                }
                window.postMessage('game over man');
            } else {
                y++;
                x = x + direction;
                thisElement.style.top = y + 'px';
                thisElement.style.left = x + 'px';
                if((x + thisElement.offsetWidth > window.innerWidth) || (x < 0)) {
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


