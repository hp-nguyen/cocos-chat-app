cc.Class({
  extends: cc.Component,

  properties: {
    avatarImg: cc.Sprite,
    usernameInput: cc.EditBox,
    submitBtn: cc.Button,
  },

  onLoad() {
    this.userData = {};
  },

  start() {},
  onInputUsername() {
    if (this.usernameInput.string.trim()) {
      this.userData.username = this.usernameInput.string;
      this.userData.avatar = this.avatarImg.spriteFrame;
      this.submitBtn.interactable = true;
    } else this.submitBtn.interactable = false;
  },
  onPickAvatar() {
    this.userData.avatar = this.avatarImg.spriteFrame;
  },

  onPlay() {
    const data = this.userData;
    cc.director.loadScene('GamePlay', function () {
      cc.director.getScene().emit('userData', data);
    });
  },
});
