cc.Class({
  extends: cc.Component,

  properties: {
    avatarImg: cc.Sprite,
  },

  onPickAvatar() {
    this.avatarImg.spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;
  },
});
