export function positionAndDimensionsToStyles ({ width, height }: { width: number, height: number }) {
  return {
    width: width || 'auto',
    height: height || 'auto',
  };
}
