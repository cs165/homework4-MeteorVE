// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor() {

    // Variable
    this.inputValue = document.querySelector('#query-input');
    this.audioPlayer = new AudioPlayer();
    this.gifBox = null;
    this.kickNum = 1; // Because we had preloaded on back_ground

    // Bind
    this.submitOperation = this.submitOperation.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.onKick = this.onKick.bind(this);

    // Icon Set
    const iconEle = document.querySelector(".icon");
    iconEle.onclick = () => {
      //iconEle.src = iconEle.src.indexOf('pause.png') != -1 ? './images/play.png' : './images/pause.png';
      if (iconEle.src.indexOf('pause.png') != -1 ){
        iconEle.src = './images/play.png';
        this.audioPlayer.pause();
      }else{
        iconEle.src = './images/pause.png';
        this.audioPlayer.play();
      }
    }

  }

  submitOperation(gifKeyword){
    const audioDiv = document.querySelector('#audioDiv');
    audioDiv.style.display = 'flex';
    this.gifBox = new GifDisplay(gifKeyword);
    this.gifBox.loadGif();
  }

  playAudio(musicUrl){
    this.audioPlayer.setSong(musicUrl);
    this.audioPlayer.setKickCallback(this.onKick);
    this.audioPlayer.play();
  }

  onKick() {
    console.log('Kick appear');
    this.gifBox.nextGif(this.kickNum);
    this.kickNum += 1;
    if (this.kickNum >= 25) this.kickNum = 0;
  }
}
