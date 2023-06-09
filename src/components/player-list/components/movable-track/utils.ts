import {DraggbleDataObject} from '../../types';

export function objectMove(
  object: DraggbleDataObject,
  from: number,
  to: number,
) {
  'worklet';

  const newObject = Object.assign({}, object);
  for (const id in object) {
    if (object[id]?.index === from) {
      newObject[id] = {index: to, item: newObject[id].item};
    }

    if (object[id]?.index === to) {
      newObject[id] = {index: from, item: newObject[id].item};
    }
  }

  return newObject;
}

export function clamp(value: number, lowerBound: number, upperBound: number) {
  'worklet';

  return Math.max(lowerBound, Math.min(value, upperBound));
}
