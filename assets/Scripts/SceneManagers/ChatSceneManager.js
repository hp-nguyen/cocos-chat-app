cc.Class({
  extends: cc.Component,
  properties: {
    chatManager: cc.Node,
  },
  onLoad() {
    cc.director.getScene().on('userData', this.onReceiveUserData, this);
  },

  onReceiveUserData(data) {
    this.chatManager.getComponent('ChatManager').newMessageData.username = data.username;
  },

  onDestroy() {
    cc.director.getScene().off('userData', this.onReceiveUserInfo, this);
  },
});
