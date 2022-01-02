import Screen from "./screen/screen";

export interface GameSettings {
  showFPS: boolean,
  targetFPS: number
}

interface RenderState {
  secondsPassed: number;
  previousTimeStamp: DOMHighResTimeStamp | null; 
}

interface GameState {

}

class Game {
  private screen: Screen;
  private settings: GameSettings;
  private state: GameState;
  private renderState: RenderState;

  constructor({ showFPS = false, targetFPS = 60 }: GameSettings) {
    this.screen = new Screen();

    this.settings = {
      showFPS,
      targetFPS,
    };

    this.state = {};
    this.renderState = {
      secondsPassed: 0,
      previousTimeStamp: null,
    };

    // start the main game loop
    window.requestAnimationFrame(this.gameLoop);
  }

  gameLoop = (timeStamp: DOMHighResTimeStamp) => {
    if (this.settings.showFPS) {
      // Calculate the numver of seconds passed since the last frame
      this.renderState.secondsPassed = (timeStamp - (this.renderState.previousTimeStamp || 0)) / 1000;
      this.renderState.previousTimeStamp = timeStamp;

      // Calculate FPS
      const fps = Math.round(1 / this.renderState.secondsPassed);

      // Draw FPS counter on screen
      this.screen.drawFPS(fps);
    }

    this.screen.draw();

    window.requestAnimationFrame(this.gameLoop);
  }
}

export default Game;