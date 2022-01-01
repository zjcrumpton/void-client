import Screen from "./screen/screen";

class Game {
  private screen: Screen;

  constructor() {
    this.screen = new Screen();
  }
}

export default Game;