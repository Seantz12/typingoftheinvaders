var word = ''


class TestElement extends HTMLElement {
    constructor() {
        super();
        this.wordThing = "aylmaotest";
        const shadow = this.attachShadow({mode: 'open'});
        var text = document.createTextNode(this.wordThing);
        shadow.appendChild(text);
        // does nothing else
    }
    connectedCallback() {
        this.setAttribute('id', this.word)
        console.log("element created!");
    }

    get word() {
        return this.wordThing
    }

    deleteElement() {
        this.outerHtml = "";
    }
}

window.customElements.define('test-element', TestElement);

document.addEventListener('keydown', function(event){
    if(event.key == 'Enter') {
        console.log(word);
        word = "";
    } else if(event.key != 'Shift'){
        word += event.key
    }
});

window.onload = function() {
    var para = document.createElement('p');
    var node = document.createTextNode('Test');
    para.appendChild(node);
    var element = document.getElementById('invaderSpawn');
    element.appendChild(para);
    var test = document.createElement('test-element');
    element.appendChild(test);
}