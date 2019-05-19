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
    

    // fill out the query-input
    var themeValue = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
    this.inputValue = document.querySelector('#query-input');
    this.inputValue.value = themeValue[Math.floor(Math.random() * themeValue.length)];
    
    const form = document.querySelector('form');
    form.addEventListener('submit', this.submitOperation);
  }

  submitOperation(){
    event.preventDefault();

    const themeValue = document.querySelector('#song-selector').value;
    const musicScreen = new MusicScreen();

    // Send Gif keyword
    musicScreen.submitOperation(this.inputValue.value);
    
    console.log(musicScreen.gifBox.gifLengt);
    
    // Confirm if Gif List < 2
    if (musicScreen.gifBox.gifLength < 2){
      document.querySelector('#error').classList.remove("inactive");
    }else{
      this.hide();
      for (let info in this.audioInfo) {
        if (JSON.stringify(this.audioInfo[info].title) == themeValue) {
          musicScreen.playAudio(this.audioInfo[info].songUrl);
        }
      }// end of for loop
    } // end of else condition 
  } // end of submitOperation

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