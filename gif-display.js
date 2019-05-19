// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(keyword) {
    this.gifInfo = null;
    this.keyword = keyword;
    this.gifLength = 0;
    this.saveAndShow = this.saveAndShow.bind(this);
    this.renderBackGround = this.renderBackGround.bind(this);


  }// end of constructor

  loadGif(){
    fetch('https://api.giphy.com/v1/gifs/search?q=' + this.keyword + '&api_key=63MNNgrWZ0dbDNnxQjl7PdyPmWFJsrgw&limit=25&rating=g')
      .then(response => response.json())
      .then(this.saveAndShow);
    console.log("Load GIF Complete.");
  }

  saveAndShow(json){
    // check if Gif Json < 2
    console.log("[Gif list] : ", json.data);
    this.gifLength = json.data.length;
    console.log("in gif class :",this.gifLength);
    
    if (this.gifLength < 2) return ; 

    this.gifInfo = json;
    const gifUrl = this.gifInfo.data[0].images.downsized.url.slice(6);
    var gifScreen = document.querySelector('.front_ground');  // music_screen => front_ground
    gifScreen.style.backgroundImage = "url(https:"  + gifUrl + ")";
    this.renderBackGround(0);
  }

  // call by music-screen : onKick and this.save&show
  nextGif(kickNum){
    
    console.log("Switch happened");// switch class
    var music_screen = document.querySelector('#music_screen');
    var cloneDiv = document.querySelector('#cloneDiv');
    if (music_screen.classList.contains("front_ground")){
      music_screen.classList.remove("front_ground");
      music_screen.classList.add("back_ground");
      cloneDiv.classList.remove("back_ground");
      cloneDiv.classList.add("front_ground");
    }else{
      music_screen.classList.add("front_ground");
      music_screen.classList.remove("back_ground");
      cloneDiv.classList.add("back_ground");
      cloneDiv.classList.remove("front_ground");
    }
    this.renderBackGround(kickNum);
  }

  renderBackGround(kickNum){
    if (kickNum >= 25) kickNum = 0;
    const gifUrl = this.gifInfo.data[kickNum].images.downsized.url.slice(6);
    var gifScreen = document.querySelector('.back_ground');
    gifScreen.style.backgroundImage = "url(https:" + gifUrl + ")";
  }


}
