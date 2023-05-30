import React, {FC, useCallback, useState} from 'react';
import {
  View,
  Image,
  Text,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import * as Animatable from 'react-native-animatable';

import {TrackType} from '../../../../data/types';
import {Colors, getColors} from '../../../../style/colors';
import {Icon} from '../../../../components/icon';

import {styles} from './list-item.styles';

type ListItemProps = {
  track: TrackType;
  index: number;
  isLast: boolean;
};

export const ListItem: FC<ListItemProps> = ({track, index, isLast}) => {
  const theme = useColorScheme();

  const [playedNow, setPlayedNow] = useState(false);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackState],
    async event => {
      const currentTrack = await TrackPlayer.getCurrentTrack();

      if (event.type === Event.PlaybackState && event.state === State.Playing) {
        if (currentTrack === index) {
          setPlayedNow(event.state === State.Playing);
        } else {
          setPlayedNow(false);
        }
      }
      if (
        event.type === Event.PlaybackState &&
        event.state === State.Paused &&
        currentTrack === index
      ) {
        setPlayedNow(false);
      }
    },
  );

  const onPressHandler = useCallback(async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const currentState = await TrackPlayer.getState();

    if (currentTrack === index) {
      if (currentState !== State.Playing) {
        TrackPlayer.play();
      } else {
        TrackPlayer.pause();
      }
    } else {
      TrackPlayer.skip(index);
      TrackPlayer.play();
    }
  }, [index]);

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      activeOpacity={0.7}
      style={[
        styles.wrapper,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          borderBottomColor: !isLast
            ? getColors(theme, Colors.label)
            : 'transparent',
          backgroundColor: playedNow
            ? getColors(theme, Colors.label)
            : 'transparent',
        },
      ]}>
      <View>
        <Image style={styles.cover} source={{uri: track.artwork}} />
        <View style={[StyleSheet.absoluteFill, styles.coverInnerWrapper]}>
          {playedNow ? (
            <Animatable.View
              style={[
                styles.dot,
                {
                  backgroundColor: getColors(theme, Colors.yellow),
                },
              ]}
              useNativeDriver={true}
              duration={1200}
              animation="pulse"
              iterationCount={'infinite'}
            />
          ) : (
            <Icon
              name={'play'}
              size={27}
              color={getColors(theme, Colors.yellow)}
            />
          )}
        </View>
      </View>
      <View style={styles.nameWrapper}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {
              color: playedNow
                ? getColors(theme, Colors.background)
                : getColors(theme, Colors.label),
            },
          ]}>
          {track.title}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            styles.artist,
            {
              color: playedNow
                ? getColors(theme, Colors.background)
                : getColors(theme, Colors.label),
            },
          ]}>
          {track.artist}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
