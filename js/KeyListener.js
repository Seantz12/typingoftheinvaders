var word = ''

document.addEventListener('keydown', function(event){
    if(event.key == 'Enter') {
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

window.onload = function() {
    setInterval(spawn, 2000);
}