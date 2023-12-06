cc.Class({
  extends: cc.Component,

  properties: {
    messagePrefab: cc.Prefab,
    chatFrame: cc.ScrollView,
    inputChat: cc.EditBox,
    sendMessageBtn: cc.Button,
  },

  onLoad() {
    this.newMessageData = {};
  },

  start() {},
  generateMessage(data) {
    const newMessage = cc.instantiate(this.messagePrefab);
    const usernameLabel = newMessage.getChildByName('Username').getComponent(cc.Label);
    const contentLabel = newMessage.getChildByName('Content').getComponent(cc.Label);
    usernameLabel.string = data.username;
    contentLabel.string = data.content;
    this.chatFrame.content.addChild(newMessage);
  },
  sendMessage() {
    if (!this.inputChat.string) return;
    this.newMessageData.username = 'Tran Le The Nam';
    this.newMessageData.content = this.inputChat.string;
    this.generateMessage(this.newMessageData);
  },
  onEditEnd() {
    this.sendMessage();
    this.inputChat.string = '';
    this.inputChat.focus();
    this.chatFrame.scrollToBottom(0.1);
  },
  validateInput() {
    if (this.inputChat.string) {
      this.sendMessageBtn.interactable = true;
    } else {
      this.sendMessageBtn.interactable = false;
    }
  },
});
