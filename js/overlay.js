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