const getPixelRatio = (context: CanvasRenderingContext2D) => {
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

const generateCanvas = (w: number, h: number) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('no context');
  const ratio = getPixelRatio(context);

  canvas.width = Math.round(w * ratio);
  canvas.height = Math.round(h * ratio);
  canvas.style.width = w +'px';
  canvas.style.height = h +'px';

  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  return { canvas, context }
};

export { getPixelRatio, generateCanvas };