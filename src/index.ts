import { EntityState } from "./entities/entitity.interface";
import Player from "./entities/Player";
import Game, { GameSettings } from "./game";

const settings: GameSettings = {
  showFPS: true,
  targetFPS: 60,
}

const game = new Game(settings);

const playerInitState: EntityState = {
  speed: 3,
  size: {
    height: 25,
    width: 25,
  },
  position: {
    x: 100,
    y: 100,
  }
}
const player = new Player(playerInitState);
game.spawnEntity(player);