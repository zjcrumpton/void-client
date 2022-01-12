import Entity from "../entities/entitity.interface";

class Screen {
  private root;
  private viewport;
  private context;
  private ratio;

  // render canvas
  constructor() {
    const root = document.getElementById('root');
    if (!root) throw new Error('no root');
    this.root = root;

    const { canvas, context } = this.generateCanvas();
    this.viewport = canvas;
    this.context = context;
    this.ratio = this.getPixelRatio(this.context);
    // this.viewport.style.border = '5px solid red';

    this.root?.append(this.viewport);

    // update the canvas size to fit the screen
    window.addEventListener('resize', this.resize);
  }

  draw = (entities: Entity[], FPS: number) => {
    this.context.clearRect(0, 0, this.viewport.width, this.viewport.height);

    this.drawFPS(FPS);

    entities.forEach((e) => {
        // e.update();
        this.render(e);
    });
  }

  render = (e: Entity) => {
    console.log('xx width, width * ratio', e.state.size.width, e.state.size.width * this.ratio); // eslint-disable-line
    this.context.fillStyle = 'blue';
    this.context.fillRect(
      e.state.position.x,
      e.state.position.y,
      e.state.size.width * this.ratio,
      e.state.size.height * this.ratio,
    );
  }
  drawFPS = (FPS: number) => {
    // this.context.clearRect(0, 0, 200, 100);
    this.context.font = '25px Arial';
    this.context.fillStyle = 'yellow';
    this.context.fillText("FPS: " + FPS, 10, 30);
  }
  
  private resize = () => {
    this.viewport.height = window.innerHeight;
    this.viewport.width = window.innerHeight * (16/9);

    this.viewport.style.width = this.viewport.width +'px';
    this.viewport.style.height = this.viewport.height +'px';
  };

  private getPixelRatio = (context: CanvasRenderingContext2D) => {
    const backingStores = [
      'webkitBackingStorePixelRatio',
      'mozBackingStorePixelRatio',
      'msBackingStorePixelRatio',
      'oBackingStorePixelRatio',
      'backingStorePixelRatio'
    ];
  
    const deviceRatio = window.devicePixelRatio;
  
    const backingRatio = backingStores.reduce((_prev, curr) => {
      return (context.hasOwnProperty(curr) ? (context as any)[curr] : 1);
    });
  
    return deviceRatio / (backingRatio as unknown as number);
  };

  private generateCanvas = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('no context');
    const ratio = this.getPixelRatio(context);
  
    canvas.height = window.innerHeight;
    canvas.width = window.innerHeight * (16/9);

    canvas.style.width = canvas.width +'px';
    canvas.style.height = canvas.height +'px';
  
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    canvas.style.backgroundColor = 'black';
  
    return { canvas, context };
  };
}

export default Screen;