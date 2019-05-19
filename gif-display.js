// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(keyword) {
    this.gifInfo = null;
    this.keyword = keyword;
    this.saveAndShow = this.saveAndShow.bind(this);


  }
  // TODO(you): Add methods as necessary.
  loadGif(){
    fetch('https://api.giphy.com/v1/gifs/search?q=' + this.keyword + '&api_key=63MNNgrWZ0dbDNnxQjl7PdyPmWFJsrgw&limit=25&rating=g')
      .then(response => response.json())
      .then(this.saveAndShow);
    console.log("Load GIF Complete.");
  }

  saveAndShow(json){
    this.gifInfo = json;
    const gifUrl = this.gifInfo.data[0].images.downsized.url.slice(6);
    var gifScreen = document.querySelector('#music_screen');
    gifScreen.style.backgroundImage = "url(https:"  + gifUrl + ")";
  }

  nextGif(kickNum){
    if (kickNum >= 25) kickNum = 0;
    const gifUrl = this.gifInfo.data[kickNum].images.downsized.url.slice(6);
    var gifScreen = document.querySelector('#music_screen');
    gifScreen.style.backgroundImage = "url(https:" + gifUrl + ")";
  }


}
