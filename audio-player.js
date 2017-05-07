// NOTE: We are expecting you to *create* an AudioPlayer, but we are *not*
// expecting you to modify the contents of this file.
class AudioPlayer {
  constructor() {
    this._onKickCallback = this._onKickCallback.bind(this);

    this.lastKickTime = -1;

    this.dancer = new Dancer();
    this.kick = this.dancer.createKick({
      onKick: this._onKickCallback
    });
    this.kick.on();
  }

  setSong(soundUrl) {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.loop = 'true';
    audio.src = soundUrl;
    this.dancer.pause();
    this.dancer.load(audio);
  }

  play() {
    this.dancer.play();
  }

  pause() {
    this.dancer.pause();
  }

  setBeatCallback(beatCallback) {
    this.kickCallback = beatCallback;
  }

  _onKickCallback() {
    if (!this.kickCallback) {
      return;
    }

    const KICK_THRESHOLD = 0.2;
    const nowTime = Date.now();
    const diff = (nowTime - this.lastKickTime) / 1000;
    if (this.lastKickTime === -1 || diff > KICK_THRESHOLD) {
      this.lastKickTime = nowTime;
      this.kickCallback();
    }
  }
}
