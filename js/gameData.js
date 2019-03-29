class GameData {
    constructor() {
        this.aliensDefeated = 0;
        this.special = false;
        this.wordfile = 'js/words.txt';
        this.word = ''
        this.intervalId = '';
        this.gameStart = false;
        this.gameLostDisplayed = false;
        this.wordArray;
        this.fs;
        fetch(wordfile).then(response => response.text()).then(text => wordArray=text.split('\n'));
    }
}