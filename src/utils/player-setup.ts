import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import {Storage} from '../services/storage';

export const setupInitialTrack = async () => {
  const lastTrackId = Storage.getInt(Storage.storageKeys.lastTrackId);

  if (lastTrackId) {
    const position = (await TrackPlayer.getQueue()).findIndex(
      el => el.id === lastTrackId,
    );

    if (position) {
      TrackPlayer.skip(position);
    }
  }
};

export const setupInitialRepeatMode = async () => {
  const mode = Storage.getInt(Storage.storageKeys.repeatMode);

  if (mode) {
    TrackPlayer.setRepeatMode(mode);
  } else {
    Storage.setInt(Storage.storageKeys.repeatMode, RepeatMode.Off);
  }
};
