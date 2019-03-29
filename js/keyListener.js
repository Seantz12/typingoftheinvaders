class Controller {
    constructor() {
        document.addEventListener('keydown', this.readKeys);
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
            intervalId = setInterval(spawn, SPAWN_RATE);
        } else if(event.key == 'Enter' && gameStart) {
            try {
                if(word == 'invaderSpawn') {
                    throw Error;
                }
                var removedElement = document.getElementById(word);
                removedElement.setAttribute('hit', 'true')
                removedElement.parentNode.removeChild(removedElement);
                if(aliensDefeated == TOTAL_ALIENS) {
                    clearInterval(intervalId);
                    var spawnId = document.getElementById('invaderSpawn');
                    spawnId.parentNode.removeChild(spawnId);
                    window.postMessage('winner!');
                } else if(aliensDefeated % DIFFICULTY_INCREMENT == 0) {
                    var newRate = SPAWN_RATE - (SPAWN_INCREASE_RATE * (aliensDefeated / DIFFICULTY_INCREMENT));
                    clearInterval(intervalId);
                    console.log('speed up ' + newRate);
                    intervalId = setInterval(spawn, newRate);
                }
                aliensDefeated++;
                console.log('hit! ' + aliensDefeated);
            } catch(error) {
                console.log('miss!');
            }
            word = "";
            event.key = '';
        } else if(event.key == 'Backspace') {
            word = word.slice(0, -1);
        } else if(event.key != 'Shift'){
            word += event.key
        }
        updateWord(word);
    }
}

var controller = new Controller();

document.addEventListener('keydown', controller.readKeys);

window.addEventListener("message", function(message){
    console.log(message.data);
    if(message.data == 'game over man' && !gameLostDisplayed) {
        gameLostMessage();
        gameLostDisplayed = true;
    } else if(message.data == 'winner!') {
        console.log('testasdasd');
        gameWonMessage();
    }
    document.removeEventListener('keydown', readKeys);
    clearInterval(intervalId);
});

function updateWord(updatedWord) {
    var textElement = document.getElementById('textInput');
    textElement.innerHTML = updatedWord;
}
