class Controller {
    constructor() {
        var self = this;
        document.addEventListener('keydown', function(event) {
            self.readKeys(event);
        });
        this.spawner = new InvaderSpawner();
        this.model = new GameData();
    }

    readKeys(event) {
        if(event.key == 'Enter' && !gameStart) {
            hideMessage();
            if(word == "polar") {
                special = true;
                wordfile = 'js/polar.txt';
                fetch(wordfile).then(response => response.text()).then(text => wordArray=text.split('\n'))
            }
            word = '';
            gameStart = true;
            this.spawner.startSpawning();
        } else if(event.key == 'Enter' && gameStart) {
            try {
                if(word == 'invaderSpawn') {
                    throw Error;
                }
                var removedElement = document.getElementById(word);
                removedElement.parentNode.removeChild(removedElement);
                if(aliensDefeated >= TOTAL_ALIENS) {
                    this.stopSpawning();
                    var spawnId = document.getElementById('invaderSpawn');
                    spawnId.parentNode.removeChild(spawnId);
                    window.postMessage('winner!');
                } else if(aliensDefeated % DIFFICULTY_INCREMENT == 0) {
                    var newRate = SPAWN_RATE - (SPAWN_INCREASE_RATE * (aliensDefeated / DIFFICULTY_INCREMENT));
                    this.stopSpawning();
                    console.log('speed up ' + newRate);
                    this.spawner.startSpawning();
                }
                aliensDefeated++;
                console.log('hit! ' + aliensDefeated);
            } catch(error) {
                console.log(error);
                console.log('miss!');
            }
            word = "";
        } else if(event.key == 'Backspace') {
            word = word.slice(0, -1);
        } else if(event.key != 'Shift'){
            word += event.key
        }
        this.updateWord(word);
    }

    get interval() {
        return this.intervalId
    }
    
    stopSpawning() {
        this.spawner.stopSpawning();
    }

    updateWord(updatedWord) {
        var textElement = document.getElementById('textInput');
        textElement.innerHTML = updatedWord;
    }
}

var controller = new Controller();

console.log(controller.spawner)

window.addEventListener("message", function(message){
    console.log(message.data);
    if(message.data == 'game over man' && !gameLostDisplayed) {
        gameLostMessage();
        gameLostDisplayed = true;
    } else if(message.data == 'winner!') {
        console.log('testasdasd');
        gameWonMessage();
    }
    document.removeEventListener('keydown', controller.readKeys);
    controller.stopSpawning();
    delete controller;
    console.log('helloasdasd');
});
