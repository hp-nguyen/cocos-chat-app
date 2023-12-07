cc.Class({
  extends: cc.Component,

  onLoad() {
    this.username = '';
    cc.director.getScene().on('userData', this.onReceiveUserData, this);
  },

  onReceiveUserData(data) {
    this.username = data.username;
    // console.log(data)
    // console.log(this.username)
  },

  onDestroy() {
    cc.director.getScene().off('userData', this.onReceiveUserInfo, this);
  },
});
