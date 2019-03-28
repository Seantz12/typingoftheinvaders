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
        this.setAttribute('id', this.key)
        console.log("element created!");
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