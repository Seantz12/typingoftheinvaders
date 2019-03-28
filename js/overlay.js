function hideMessage() {
    var element = document.getElementById('welcomeMessage');
    var op = 1;
    var timer = setInterval(function() {
        if(op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        op -= op * 0.2;
    }, 50);
}

function gameLostMessage() {
    console.log('test')
    var element = document.getElementById('gameOver');
    var op = 0.1;
    var timer = setInterval(function() {
        if(op >= 1) {
            clearInterval(timer);
            element.style.display = '';
        }
        element.style.opacity = op;
        op += op *0.2;
    }, 50);
}