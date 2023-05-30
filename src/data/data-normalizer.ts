import {RawTrackType, TrackType} from './types';

export default function (rawData: RawTrackType[]): TrackType[] {
  return rawData
    .filter(track => track.wrapperType === 'track')
    .map(track => ({
      id: track?.trackId,
      url: track?.previewUrl || '',
      title: track?.trackName || '',
      artist: track?.artistName || '',
      album: track?.collectionName || '',
      genre: track?.primaryGenreName || '',
      date: track?.releaseDate || '',
      artwork: track?.artworkUrl100 || '',
      duration: track?.trackTimeMillis / 1000 || 0,
    }));
}
