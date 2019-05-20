// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.audioInfo = null;
    this.save_and_render = this.save_and_render.bind(this);
    this.submitOperation = this.submitOperation.bind(this);
    this.checkgifLength = this.checkgifLength.bind(this);
    this.hideAndPlay = this.hideAndPlay.bind(this);
    
    this.i=0;

    // fill out the query-input
    var themeValue = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
    this.inputValue = document.querySelector('#query-input');
    this.inputValue.value = themeValue[Math.floor(Math.random() * themeValue.length)];
    
    const form = document.querySelector('form');
    form.addEventListener('submit', this.submitOperation);
  }

  submitOperation(){
    event.preventDefault();

    const musicScreen = new MusicScreen();

    // Send Gif keyword
    musicScreen.submitOperation(this.inputValue.value);
    
    
    // Confirm if Gif List < 2
    this.checkgifLength(musicScreen);
  } // end of submitOperation

  hideAndPlay(musicScreen) {
    if (musicScreen.gifBox.gifLength < 2) {
      document.querySelector('#error').classList.remove("inactive");
    } else {
      this.hide();
      const themeValue = document.querySelector('#song-selector').value;
      for (let info in this.audioInfo) {
        if (JSON.stringify(this.audioInfo[info].title) == themeValue) {
          musicScreen.playAudio(this.audioInfo[info].songUrl);
        }
      }// end of for loop
    } // end of else condition 
  }

  checkgifLength(musicScreen) {
    console.log("start to check gif Length");
    console.log(musicScreen.gifBox.gifLengt);
    var that = this;
    if(musicScreen.gifBox.gifLength == -1 || musicScreen.gifBox.gifLength == undefined){
      setTimeout(function () {
        console.log("waiting for fetch");
        console.log(that);
        
        that.checkgifLength(musicScreen);
        // if (this.i < 100) {
        //   console.log("waiting for fetch");
        //   this.checkgifLength(musicScreen);
        // }
      }, 1000);
    }else{
      this.hideAndPlay(musicScreen); 
    }
    //this.i += 1;
    
  }

  loadSelect(){
    fetch('https://fullstackccu.github.io/homeworks/hw4/songs.json')
      .then(response => response.json())
      .then(this.save_and_render);
  }

  save_and_render(json) {
    this.audioInfo = json;
    console.log(this.audioInfo);
    const renderOption = () => {      
      const SongSelect = document.querySelector('#song-selector');
      for (const title in this.audioInfo) {
        const newOption = document.createElement('option');
        newOption.innerHTML = JSON.stringify(this.audioInfo[title].title);
        SongSelect.appendChild(newOption);
      }
    }
    renderOption();
  }

  hide() {
    const menuEle = document.querySelector('#menu');
    menuEle.style.display = 'none';
    console.log("Hide the menu complete");
  }

}