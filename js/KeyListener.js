var word = ''

document.addEventListener('keydown', function(event){
    if(event.key == 'Enter') {
        try {
            var removedElement = document.getElementById(word);
            removedElement.parentNode.removeChild(removedElement);
        } catch {}
        word = "";
    } else if(event.key != 'Shift'){
        word += event.key
    }
});

window.onload = function() {
    setInterval(spawn, 2000);
}