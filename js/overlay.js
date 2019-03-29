class HTMLEditor {
    constructor(view) {
        this.textField;
        var self = this;
        view.addEventListener('onload', function() {
            self.findTextField(view);
        });
        console.log(this.textField);
    }

    findTextField() {
        this.textField = view.getElementById('textInput');
    }

    addCharacter(character) {
        console.log(this.textField.innerHTML);
        this.textField.innerHTML = this.textField.innerHTML + character;
    }
    
    deleteCharacter() {
        this.textField.innerHTML = this.textField.innerHTML.slice(0, -1);
    }

    clearWord() {
        this.textField.innerHTML = '';
    }

    getWord() {
        return this.textField.innerHTML;
    }
}

function hideMessage() {
    var element = document.getElementById('welcomeMessage');
    var op = 1;
    var timer = setInterval(function() {
        if(op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        op -= op * 0.2;
    }, 50);
}

function polarMessage() {

}

function gameLostMessage() {
    console.log('test');
    var element = document.getElementById('gameOver');
    var op = 0.1;
    element.style.display = '';
    var timer = setInterval(function() {
        if(op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += op *0.2;
    }, 50);
}

function gameWonMessage() {
    console.log('won!');
    var element = document.getElementById('gameWon');
    var op = 0.1;
    element.style.display = '';
    var timer = setInterval(function() {
        if(op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += op *0.2;
    }, 50);
}