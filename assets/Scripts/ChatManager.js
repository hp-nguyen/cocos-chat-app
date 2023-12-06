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
    this.inputChat.focus();
  },

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
    this.inputChat.string = '';
    this.chatFrame.scrollToBottom(0.1);
    this.inputChat.focus();
  },
  onEditReturn() {
    this.sendMessage();
    setTimeout(() => this.inputChat.focus(), 1);
  },
  validateInput() {
    if (this.inputChat.string) {
      this.sendMessageBtn.interactable = true;
      return true;
    }
    this.sendMessageBtn.interactable = false;
    return false;
  },
});
