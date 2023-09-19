import {
  ClipOp,
  SkImage,
  Skia,
  createPicture,
  rect,
} from '@shopify/react-native-skia';

import {IParticle} from './skia-pixelated-image.types';

export const makeImageParticles = (
  image: SkImage,
  density: number,
  size: number,
  stageWidth: number,
  stageHeight: number,
) => {
  const result: IParticle[] = [];

  const paint = Skia.Paint();

  for (let x = 0; x < stageWidth; x += density) {
    for (let y = 0; y < stageHeight; y += density) {
      const picture = createPicture(rect(0, 0, density, density), canvas => {
        canvas.translate(-x, -y);

        const clipPath = Skia.Path.Make();

        clipPath.addCircle(x, y, size);

        canvas.clipPath(clipPath, ClipOp.Intersect, true);

        canvas.drawImageRect(
          image,
          rect(0, 0, image.width(), image.height()),
          rect(0, 0, stageWidth, stageHeight),
          paint,
        );
      });
      result.push({
        x,
        y,
        savedX: x,
        savedY: y,
        vx: 0,
        vy: 0,
        picture,
      });
    }
  }

  return result;
};
