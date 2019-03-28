class TestElement extends HTMLElement {
    constructor() {
        super();

        if(typeof TestElement.count == 'undefined') TestElement.count = 0;
        else TestElement.count++;
        this.wordThing = "aylmaotest" + TestElement.count;
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
window.customElements.define('test-element', TestElement)

window.onload = function() {
    var element = document.getElementById('invaderSpawn');
    var test = document.createElement('test-element');
    element.appendChild(test);
}