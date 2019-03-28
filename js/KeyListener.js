var word = ''

document.addEventListener('keydown', function(event){
    if(event.key == 'Enter') {
        var removedElement = document.getElementById(word);
        removedElement.parentNode.removeChild(removedElement);
        word = "";
    } else if(event.key != 'Shift'){
        word += event.key
    }
});

window.onload = function() {
    setInterval(spawn, 2000);
}