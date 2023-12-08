const io = require('socket.io-client');

cc.Class({
  extends: cc.Component,

  properties: {
    sendingMessagePrefab: cc.Prefab,
    receivingMessagePrefab: cc.Prefab,
    chatFrame: cc.ScrollView,
    inputChat: cc.EditBox,
    sendMessageBtn: cc.Button,
    avatarAtlas: cc.SpriteAtlas,
  },

  onLoad() {
    this.newMessageData = {};
    this.inputChat.focus();

    this.socket = io('https://server-cocos-chat-app.onrender.com/');
    this.socket.on('connect', () => {
      cc.log('Connected to server');
    });

    this.socket.on('newMessage', data => {
      this.renderMessage('recieve', data);
    });
  },

  renderMessage(type, data) {
    const newMessage =
      type === 'send'
        ? cc.instantiate(this.sendingMessagePrefab)
        : cc.instantiate(this.receivingMessagePrefab);
    const bubbleNode = newMessage.getChildByName('Bubble');
    const avatarSprite = newMessage.getChildByName('Avatar').getComponent(cc.Sprite);
    const usernameLabel = bubbleNode.getChildByName('Username').getComponent(cc.Label);
    const contentLabel = bubbleNode.getChildByName('Content').getComponent(cc.Label);
    usernameLabel.string = data.username;
    contentLabel.string = data.content;
    this.setAvatar(avatarSprite, data.avatarName);
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
  setAvatar(avatarSprite, avatarName) {
    const avatarFrames = this.avatarAtlas.getSpriteFrames();
    for (let frame of avatarFrames) {
      if (avatarName === frame.name) {
        avatarSprite.spriteFrame = frame;
        return;
      }
    }
  },
});
