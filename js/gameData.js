class GameData {
    constructor() {
        this.aliensDefeated = 0;
        this.special = false;
        this.wordfile = 'js/words.txt';
        this.wordArray;
        var fs;
        fetch(wordfile).then(response => response.text()).then(text => wordArray=text.split('\n'));
    }

    get getAliensDefeated() {
        return this.aliensDefeated;
    }

    alienDestroyed() {
        this.aliensDefeated++;
    }

    get getSpecial() {
        return this.special;
    }

    enableSpecial() {
        this.special = true;
    }

    get getWordArray() {
        return this.wordArray;
    }
}