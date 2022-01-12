import Game, { GameSettings } from "./game";

const settings: GameSettings = {
  showFPS: true,
  targetFPS: 60,
}

const game = new Game(settings);
console.log(game);
