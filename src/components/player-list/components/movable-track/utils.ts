import {TrackType} from '../../../../data/types';

export function objectMove(
  object: {[key: string]: TrackType['id']},
  from: TrackType['id'],
  to: TrackType['id'],
) {
  'worklet';

  const newObject = Object.assign({}, object);
  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
}

export function clamp(value: number, lowerBound: number, upperBound: number) {
  'worklet';

  return Math.max(lowerBound, Math.min(value, upperBound));
}
