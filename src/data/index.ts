import {data} from './data';
import dataNormalizer from './data-normalizer';
import {RawTrackType} from './types';

export default dataNormalizer(data.results as RawTrackType[]);
