cc.Class({
  extends: cc.Component,
  properties: {
    userAvatar: cc.Sprite,
    username: cc.Label,
  },
  onLoad() {
    this.userData = {};
    cc.director.getScene().on('userData', this.onReceiveUserData, this);
  },

  start() {},

  onReceiveUserData(data) {
    this.userData.username = data.username;
    this.userData.avatar = data.avatar;
    this.userAvatar.spriteFrame = this.userData.avatar;
    this.username.string = this.userData.username;
  },

  onDestroy() {
    cc.director.getScene().off('userData', this.onReceiveUserInfo, this);
  },
});
