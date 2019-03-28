var word = ''
document.addEventListener('keydown', function(event){
    if(event.key == 'Enter') {
        console.log(word);
        word = '';
    } else if(event.key != 'Shift'){
        word += event.key
    }
});