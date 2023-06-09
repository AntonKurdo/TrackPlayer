import {TrackType} from '../../data/types';

export type DraggbleDataObject = {
  [key: TrackType['id']]: {index: number; item: TrackType};
};
