import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import * as Animatable from 'react-native-animatable';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import {SwipeableButton} from '../../../swipeable-button';
import favouritesList from '../../../../state-management/state/favourites-list';
import {TrackType} from '../../../../data/types';
import {Colors, getColors} from '../../../../style/colors';
import {Icon} from '../../../../components/icon';
import {withTheme} from '../../../../hocs/with-theme';

import {styles} from './list-item.styles';

type ListItemProps = {
  track: TrackType;
  isLast: boolean;
  withSweapable?: boolean;
  DragAreaComponent?: React.ReactNode;
  isDragActive?: boolean;
};

export const ListItem = withTheme<ListItemProps>(
  ({track, isLast, withSweapable, DragAreaComponent, isDragActive, theme}) => {
    const [playedNow, setPlayedNow] = useState(false);

    useEffect(() => {
      checkIfPlayingWhileInitialization();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const animatedStyles = useAnimatedStyle(
      () => ({
        borderBottomWidth: withTiming(!isLast ? 0.3 : 0),
      }),
      [isLast],
    );

    const checkIfPlayingWhileInitialization = useCallback(async () => {
      const isPlaying = (await TrackPlayer.getState()) === State.Playing;

      if (isPlaying) {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        const currentQueue = await TrackPlayer.getQueue();

        const isCurrentTrack = currentQueue[currentTrack!].id === track.id;

        setPlayedNow(isCurrentTrack);
      }
    }, [track.id]);

    useTrackPlayerEvents(
      [Event.PlaybackTrackChanged, Event.PlaybackState],
      async event => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        const currentQueue = await TrackPlayer.getQueue();

        const isCurrentTrack = currentQueue[currentTrack!].id === track.id;

        if (
          event.type === Event.PlaybackState &&
          event.state === State.Playing
        ) {
          if (isCurrentTrack) {
            setPlayedNow(event.state === State.Playing);
          } else {
            setPlayedNow(false);
          }
        }
        if (
          event.type === Event.PlaybackState &&
          event.state === State.Paused &&
          isCurrentTrack
        ) {
          setPlayedNow(false);
        }
      },
    );

    const unlike = useCallback(() => {
      favouritesList.removeTrackFromFavourites(track.id);
    }, [track.id]);

    const onPressHandler = useCallback(async () => {
      try {
        const currentTrack = await TrackPlayer.getCurrentTrack();

        const currentQueue = await TrackPlayer.getQueue();

        const currentState = await TrackPlayer.getState();

        if (currentQueue[currentTrack!].id === track.id) {
          if (currentState !== State.Playing) {
            TrackPlayer.play();
          } else {
            TrackPlayer.pause();
          }
        } else {
          TrackPlayer.skip(currentQueue.findIndex(t => t.id === track.id));
          TrackPlayer.play();
        }
      } catch (error) {
        console.error(error);
      }
    }, [track.id]);

    const content = useMemo(
      () => (
        <Animated.View
          style={[
            animatedStyles,
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
          {isDragActive ? (
            <Animatable.View
              animation={'fadeIn'}
              duration={500}
              useNativeDriver>
              {DragAreaComponent}
            </Animatable.View>
          ) : (
            <Animatable.View
              animation={'fadeIn'}
              duration={500}
              useNativeDriver>
              <Image style={styles.cover} source={{uri: track.artwork}} />
              <TouchableOpacity
                onPress={onPressHandler}
                activeOpacity={0.7}
                style={[StyleSheet.absoluteFill, styles.coverInnerWrapper]}>
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
              </TouchableOpacity>
            </Animatable.View>
          )}
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
        </Animated.View>
      ),
      [
        DragAreaComponent,
        animatedStyles,
        isDragActive,
        isLast,
        onPressHandler,
        playedNow,
        theme,
        track.artist,
        track.artwork,
        track.title,
      ],
    );

    if (withSweapable) {
      return <SwipeableButton onPress={unlike}>{content}</SwipeableButton>;
    }

    return content;
  },
);
