// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.

    var menu = document.getElementById('#menu');
    // menuElement.addEventListener('submit', this.Submit);
    var musicElement = document.getElementById('#main');

    const MenuEle = new MenuScreen(menu);
    MenuEle.loadAudios();

    
  }
  // TODO(you): Add methods as necessary.
}
