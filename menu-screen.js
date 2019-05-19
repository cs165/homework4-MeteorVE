// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    this._onJsonReady = this._onJsonReady.bind(this);
    this.createOption = this.createOption.bind(this);
    this.hide = this.hide.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this.audioInfo = new Array();
    var words = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
    this.inputValue = document.querySelector('#query-input');
    console.log(this.inputValue);
    this.inputValue.value = words[Math.floor(Math.random() * words.length)];
    console.log(words);
    const form = document.querySelector('form');
    form.addEventListener('submit', this._onSubmit);

   
  }
  _onSubmit() {

    const chooseValue = document.querySelector('#song-selector').value;
    console.log(chooseValue);
    console.log(this.inputValue.value);
    this.hide();
    const audioScreenElement = document.querySelector('#audio-screen');
    audioScreenElement.style.display = 'flex';
    const gifElement = new GifDisplay(this.inputValue.value);
    event.preventDefault();
    gifElement.loadgif();
    const musicElement = new MusicScreen(gifElement);
    /*use choose(title) to got the url from audioInfo(JSON)*/
    for (const info in this.audioInfo) {
      console.log(this.audioInfo[info].title);
      if (JSON.stringify(this.audioInfo[info].title) == chooseValue) {
        console.log(this.audioInfo[info].songUrl);
        musicElement.playAudio(this.audioInfo[info].songUrl);
      }
    }
  }
  createOption(selectContainer, audioTitle) {
    const newOption = document.createElement('option');
    console.log(newOption);
    newOption.innerHTML = JSON.stringify(audioTitle);
    return newOption;
  }
  _renderAudios() {
    const selectContainer = document.querySelector('#song-selector');
    for (const info in this.audioInfo) {
      const audio = this.createOption(selectContainer, this.audioInfo[info].title);
      selectContainer.appendChild(audio);
    }
  }
  loadAudios() {
    fetch('https://fullstackccu.github.io/homeworks/hw4/songs.json')
      .then(this._onResponse)
      .then(this._onJsonReady);
  }

  _onJsonReady(json) {
    this.audioInfo = json;
    console.log(this.audioInfo);
    this._renderAudios();
  }

  _onResponse(response) {
    return response.json();
  }
  hide() {
    const menuElement = document.querySelector('#menu');
    menuElement.style.display = 'none';
    console.log(menuElement.style.display);
  }

}
