var word = ''
var intervalId = '';
var gameStart = false;
var gameLostDisplayed = false;

function readKeys(event) {
    var aliensDefeated = 0;
    var spawnRate = 1000;
    if(event.key == 'Enter' && !gameStart) {
        if(word == "polar") console.log('special!');
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
            removedElement.parentNode.removeChild(removedElement);
            if(aliensDefeated == 15) {
                clearInterval(intervalId);
            }
            if(aliensDefeated % 10 == 0) {
                spawnRate -= 100;
                clearInterval(intervalId);
                intervalId = setInterval(spawn, spawnRate);
            }
            console.log('hit!');
        } catch(error) {
            console.log('miss!');
        }
        word = "";
        event.key = '';
    } else if(event.key != 'Shift'){
        word += event.key
    }
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
