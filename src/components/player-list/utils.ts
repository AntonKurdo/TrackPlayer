import {TrackType} from '../../data/types';
import {DraggbleDataObject} from './types';

export function listToObject(list: TrackType[]) {
  const object: DraggbleDataObject = {};

  for (let i = 0; i < list.length; i++) {
    object[list[i].id] = {index: i, item: list[i]};
  }

  return object;
}

export const objectToList = (obj: DraggbleDataObject): TrackType[] => {
  return Object.values(obj)
    .sort((a, b) => (a.index > b.index ? 1 : -1))
    .map(el => el.item);
};
