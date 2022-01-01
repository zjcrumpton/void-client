import { generateCanvas, getPixelRatio } from "./utils/canvas.utils";

class Game {
  private root;
  private viewport;
  private context;

  // render canvas
  constructor() {
    const root = document.getElementById('root');
    if (!root) throw new Error('no root');
    this.root = root;

    const { canvas, context } = generateCanvas(window.innerWidth, window.innerHeight);
    this.viewport = canvas;
    this.context = context;

    this.root?.append(this.viewport);
    this.viewport.style.backgroundColor = 'black';

    // update the canvas size to fit the screen
    window.addEventListener('resize', this.resize);
  }
  
  resize = () => {
    const ratio = getPixelRatio(this.context);
    this.viewport.width = Math.round(window.innerWidth * ratio);
    this.viewport.height = Math.round(window.innerHeight * ratio);
    this.viewport.style.width = window.innerWidth +'px';
    this.viewport.style.height = window.innerHeight +'px';
  };
}

export default Game;