const randomWords = require('random-words');
cc.Class({
  extends: cc.Component,

  properties: {
    totalTime: {
      default: 60,
      serializable: true,
    },
    playerInput: cc.EditBox,
    paragraphLayout: cc.Layout,
    wordPrefab: cc.Prefab,
    resultTable: cc.Layout,
    wpmLabel: cc.Label,
    correctWordsLabel: cc.Label,
    wrongWordsLabel: cc.Label,
  },

  onLoad() {
    this.isPlaying = true;
    this.words = randomWords(24);
    this.paragraph = this.words.join(' ');
    this.wordLabels = [];
    for (let word of this.words) {
      this.generateNewLabel(word);
    }
    this.curWordIndex = 0;
    this.curWord = this.words[this.curWordIndex];
    this.correctWords = 0;
    this.wrongWords = 0;
    this.timer = 0;
  },

  start() {},
  onTextInput() {
    if (this.playerInput.string.at(-1) === ' ') {
      this.checkCurTyping();
    }
  },
  checkCurTyping() {
    if (this.playerInput.string.trim() === this.curWord) {
      this.correctWords += 1;
      this.wordLabels[this.curWordIndex].getComponent(cc.Label).node.color = cc.Color.GREEN;
    } else {
      this.wordLabels[this.curWordIndex].getComponent(cc.Label).node.color = cc.Color.RED;
      this.wrongWords += 1;
    }
    this.playerInput.string = '';
    this.playerInput.blur();
    this.playerInput.focus();
    this.curWordIndex += 1;
    if (this.checkEndGame()) {
      this.onEndGame();
    }
    this.curWord = this.words[this.curWordIndex];
  },
  generateNewLabel(text) {
    const newLabel = cc.instantiate(this.wordPrefab);
    newLabel.getComponent(cc.Label).string = text;
    this.paragraphLayout.node.addChild(newLabel);
    this.wordLabels.push(newLabel);
  },
  checkEndGame() {
    if (this.timer >= this.totalTime || this.curWordIndex === this.words.length) return true;
    return false;
  },
  onEndGame() {
    this.playerInput.node.active = false;
    this.paragraphLayout.node.active = false;
    this.wpmLabel.string = `WPM: ${Math.trunc((this.correctWords / this.timer) * 60)}`;
    this.correctWordsLabel.string = `Correct words: ${this.correctWords}`;
    this.wrongWordsLabel.string = `Wrong words: ${this.wrongWords}`;
    this.resultTable.node.active = true;
    this.isPlaying = false;
  },
  update(dt) {
    if (this.isPlaying) {
      if (this.checkEndGame()) {
        this.onEndGame();
      }
    }
    if (this.timer <= this.totalTime) this.timer += dt;
  },
});
