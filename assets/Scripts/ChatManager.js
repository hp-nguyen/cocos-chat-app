const io = require('socket.io-client');

cc.Class({
  extends: cc.Component,

  properties: {
    mainCanvas: cc.Canvas,
    sendingMessagePrefab: cc.Prefab,
    receivingMessagePrefab: cc.Prefab,
    chatFrame: cc.ScrollView,
    inputChat: cc.EditBox,
    sendMessageBtn: cc.Button,
  },

  onLoad() {
    this.newMessageData = {};
    const username = this.mainCanvas.getComponent('ChatSceneManager').username;
    console.log(username)
    this.newMessageData.username = username;
    console.log(this.newMessageData);
    this.inputChat.focus();

    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      cc.log('Connected to server');
    });

    this.socket.on('newMessage', data => {
      console.log(data);
      this.renderMessage('recieve', data);
    });
  },

  renderMessage(type, data) {
    const newMessage =
      type === 'send'
        ? cc.instantiate(this.sendingMessagePrefab)
        : cc.instantiate(this.receivingMessagePrefab);
    const usernameLabel = newMessage.getChildByName('Username').getComponent(cc.Label);
    const contentLabel = newMessage.getChildByName('Content').getComponent(cc.Label);
    usernameLabel.string = data.username;
    contentLabel.string = data.content;
    this.chatFrame.content.addChild(newMessage);
  },
  onSendMessage() {
    if (!this.inputChat.string) return;
    this.newMessageData.content = this.inputChat.string;
    this.renderMessage('send', this.newMessageData);
    this.socket.emit('sendMessage', this.newMessageData);
    this.inputChat.string = '';
    this.chatFrame.scrollToBottom(0.1);
    this.inputChat.focus();
  },
  onEditReturn() {
    this.onSendMessage();
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
