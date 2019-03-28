var word = ''
var gameStart = false;

document.addEventListener('keydown', function(event){
    if(event.key == 'Enter' && !gameStart) {
        if(word == "polar") console.log('special!');
        gameStart = true;
        hideMessage();
        setInterval(spawn, 2000);
    } else if(event.key == 'Enter' && gameStart) {
        try {
            if(word == 'invaderSpawn') {
                console.log('stop that'); 
                throw Error;
            }
            var removedElement = document.getElementById(word);
            removedElement.parentNode.removeChild(removedElement);
        } catch {}
        word = "";
        event.key = '';
    } else if(event.key != 'Shift'){
        word += event.key
    }
});

window.addEventListener("message", function(){
    gameLostMessage();
});