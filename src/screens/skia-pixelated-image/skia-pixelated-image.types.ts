import {SkPicture} from '@shopify/react-native-skia';

export type IParticle = {
  x: number;
  y: number;
  savedX: number;
  savedY: number;
  vx: number;
  vy: number;
  picture: SkPicture;
};
