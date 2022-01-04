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

    const { canvas, context } = this.generateCanvas(window.innerWidth, window.innerHeight);
    this.viewport = canvas;
    this.context = context;
    this.ratio = this.getPixelRatio(this.context);
    this.viewport.style.border = '5px solid red';

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
    const ratio = this.getPixelRatio(this.context);
    console.log('xx ', this.ratio, ratio); // eslint-disable-line
    this.ratio = ratio;
    this.viewport.width = Math.round(window.innerWidth * ratio);
    this.viewport.height = Math.round(window.innerHeight * ratio);
    this.viewport.style.width = window.innerWidth +'px';
    this.viewport.style.height = window.innerHeight +'px';
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
  
    const backingRatio = backingStores.reduce((prev, curr) => {
      return (context.hasOwnProperty(curr) ? (context as any)[curr] : 1);
    });
  
    return deviceRatio / (backingRatio as unknown as number);
  };

  private generateCanvas = (w: number, h: number) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('no context');
    const ratio = this.getPixelRatio(context);
  
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    canvas.style.width = w +'px';
    canvas.style.height = h +'px';
  
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    canvas.style.backgroundColor = 'black';
  
    return { canvas, context };
  };
}

export default Screen;