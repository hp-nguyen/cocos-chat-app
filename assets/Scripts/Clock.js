cc.Class({
  extends: cc.Component,

  properties: {
    background: cc.Sprite,
    cover: cc.Sprite,
    timeLabel: cc.Label,
    totalTime: {
      default: 60,
      serializable: true,
    },
  },
  onLoad() {
    this.timer = this.totalTime + 1;
    this.timeLabel.string = this.totalTime;
  },

  start() {},

  update(dt) {
    if (this.timer >= 0) {
      this.timer -= dt;
      this.timeLabel.string = Math.trunc(this.timer);
      this.cover.fillRange -= (1 / this.totalTime) * dt;
    }

    if (this.timer <= 0.1 * this.totalTime) {
      this.background.node.color = cc.Color.RED;
    } else if (this.timer <= 0.4 * this.totalTime) {
      this.background.node.color = cc.Color.YELLOW;
    } else {
      this.background.node.color = cc.Color.GREEN;
    }
  },
});
