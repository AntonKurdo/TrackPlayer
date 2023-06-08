import {TrackType} from '../../data/types';

export function listToObject(list: TrackType[]) {
  const values = Object.values(list);
  const object = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }

  return object;
}

export const objectToList = (
  obj: {[key: string]: TrackType['id']},
  data: TrackType[],
): TrackType[] => {
  const arr: TrackType[] = [];

  Object.keys(obj).map(
    id => (arr[obj[id]] = data.find(el => el.id.toString() === id.toString())),
  );

  return arr;
};
