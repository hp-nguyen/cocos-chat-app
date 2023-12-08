cc.Class({
  extends: cc.Component,

  properties: {
    avatarImg: cc.Sprite,
    usernameInput: cc.EditBox,
    submitBtn: cc.Button,
  },

  onLoad() {
    this.userData = {
      avatarName: 'chibi-avatars-removebg_05',
    };
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
    this.userData.avatarName = this.avatarImg.spriteFrame.name;
  },

  onPlay() {
    const data = this.userData;
    cc.director.loadScene('Chat', function () {
      cc.director.getScene().emit('userData', data);
    });
  },
});
