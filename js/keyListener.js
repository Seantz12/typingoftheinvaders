var word = ''
var intervalId = '';
var gameStart = false;
var gameLostDisplayed = false;

function readKeys(event) {
    var spawnRate = 1000;
    if(event.key == 'Enter' && !gameStart) {
        if(word == "polar") console.log('special!');
        word = '';
        gameStart = true;
        hideMessage();
        intervalId = setInterval(spawn, spawnRate);
    } else if(event.key == 'Enter' && gameStart) {
        try {
            if(word == 'invaderSpawn') {
                console.log('stop that'); 
                throw Error;
            }
            var removedElement = document.getElementById(word);
            removedElement.setAttribute('hit', 'true')
            removedElement.parentNode.removeChild(removedElement);
            if(aliensDefeated == 4) {
                clearInterval(intervalId);
                var spawnId = document.getElementById('invaderSpawn');
                spawnId.parentNode.removeChild(spawnId);
                window.postMessage('winner!');
            } else if(aliensDefeated % 10 == 0) {
                console.log('speed up');
                spawnRate -= 100;
                clearInterval(intervalId);
                intervalId = setInterval(spawn, spawnRate);
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

document.addEventListener('keydown', readKeys);

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
