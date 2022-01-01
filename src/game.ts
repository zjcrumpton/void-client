class Game {
  private root;
  private viewport;
  private context;

  // render canvas
  constructor() {
    const root = document.getElementById('root');
    if (!root) throw new Error('no root');
    this.root = root;

    this.viewport = document.createElement('canvas');

    const context = this.viewport.getContext('2d');
    if (!context) throw new Error('no context');
    this.context = context;

    this.viewport.width = 800;
    this.viewport.height = 600;

    this.root?.append(this.viewport);
  }

  init = () => {
    this.context.font = '32px Arial';
    this.context.fillText('It\'s dangerous to travel this route alone.', 5, 50, 800);
  }
}

export default Game;