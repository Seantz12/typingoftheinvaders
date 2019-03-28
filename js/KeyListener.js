var word = ''

document.addEventListener('keydown', function(event){
    if(event.key == 'Enter') {
        try {
            console.log('test')
            var removedElement = document.getElementById(word);
            removedElement.parentNode.removeChild(removedElement);
        } catch {

        }
        console.log(word);
        word = "";
    } else if(event.key != 'Shift'){
        word += event.key
    }
});
