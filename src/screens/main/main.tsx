import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import {withTheme} from '../../hocs/with-theme';
import {Colors, getColors} from '../../style/colors';
import {PlayerList} from '../../components/player-list';
import {TrackType} from '../../data/types';

import {styles} from './main.styles';

export const Main = withTheme(({theme}) => {
  const [trackList, setTrackList] = useState<TrackType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TrackPlayer.getQueue().then(tracks => {
      setTrackList(tracks as TrackType[]);
      setLoading(false);
    });
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: getColors(theme, Colors.background),
        },
      ]}>
      {trackList.length > 0 && (
        <PlayerList loading={loading} data={trackList} />
      )}
    </SafeAreaView>
  );
});
