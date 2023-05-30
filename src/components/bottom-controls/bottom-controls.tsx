import React, {FC, useEffect, useRef, useState, useCallback} from 'react';
import {
  GestureResponderEvent,
  Image,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import * as Animatable from 'react-native-animatable';

import {playerModalState} from '../../state-management';
import {appObserver} from '../../state-management/utils';
import {TrackProgress} from '../track-progress';
import {Colors, getColors} from '../../style/colors';
import {TrackType} from '../../data/types';
import {Icon} from '../icon';

import {styles} from './bottom-controls.styles';

export const BottomControls: FC<{}> = appObserver(({}) => {
  const touchX = useRef(0);

  const theme = useColorScheme();

  const [playbackState, setPlaybackState] = useState(State.Ready);

  const [trackInfo, setTrackInfo] = useState<TrackType | undefined>(undefined);

  const animatableTitle = useRef<Animatable.View & View>(null);

  const openModal = useCallback(() => playerModalState.openModel(), []);

  useEffect(() => {
    TrackPlayer.getCurrentTrack().then(async track => {
      const currentTrack = await TrackPlayer.getTrack(track as number);

      setTrackInfo(currentTrack as TrackType);

      const state = await TrackPlayer.getState();

      setPlaybackState(state);
    });
  }, []);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackState],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);

        if (track) {
          setTrackInfo(track as TrackType);
        }
      }
      if (event.type === Event.PlaybackState && event.state === State.Playing) {
        setPlaybackState(event.state);
      }
      if (event.type === Event.PlaybackState && event.state === State.Paused) {
        setPlaybackState(event.state);
      }
    },
  );

  const onTouchEndButton = (evt: GestureResponderEvent) => {
    if (playbackState !== State.Playing) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }

    evt.stopPropagation();
  };

  const onTouchStart = (evt: GestureResponderEvent) => {
    touchX.current = evt.nativeEvent.pageX;
  };

  const onTouchEnd = async (evt: GestureResponderEvent) => {
    evt.persist();
    try {
      const track = await TrackPlayer.getCurrentTrack();
      const queue = await TrackPlayer.getQueue();
      if (
        touchX.current - evt.nativeEvent.pageX < 10 &&
        touchX.current - evt.nativeEvent.pageX > -10
      ) {
        openModal();
        touchX.current = 0;
        return;
      }

      if (touchX.current - evt.nativeEvent.pageX < 0 && track !== 0) {
        if (
          animatableTitle.current &&
          typeof animatableTitle.current.slideInLeft === 'function'
        ) {
          animatableTitle.current.slideInLeft(350);
        }

        await TrackPlayer.skipToPrevious();
      }
      if (
        touchX.current - evt.nativeEvent.pageX > 0 &&
        track !== queue.length - 1
      ) {
        if (
          animatableTitle.current &&
          typeof animatableTitle.current.slideInRight === 'function'
        ) {
          animatableTitle.current.slideInRight(350);
        }

        await TrackPlayer.skipToNext();
      }
      touchX.current = 0;
    } catch (error) {
      console.error({error});
    }
  };

  return (
    <Animatable.View
      useNativeDriver
      duration={300}
      animation={'slideInUp'}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
      <TrackProgress
        containerStyles={styles.progressContainer}
        sliderStyles={styles.sliderStyles}
        progressThumbStyles={styles.progressThumbStyles}
        withTime={false}
        minimumTrackTintColor={getColors(theme, Colors.yellow)}
      />

      <View
        style={[
          styles.container,
          {
            backgroundColor: getColors(theme, Colors.bottomControlsBackground),
          },
        ]}>
        <View style={styles.wrapper}>
          <View style={styles.innerWrapper}>
            <View style={styles.buttonWrapper} onTouchEnd={onTouchEndButton}>
              <Icon
                name={playbackState !== State.Playing ? 'play' : 'pause'}
                size={30}
                color={getColors(theme, Colors.bottomControlsLabel)}
              />
            </View>
            <View style={styles.animationWrapper}>
              <Animatable.View ref={animatableTitle} animation={'fadeIn'}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.artist,
                    {
                      color: getColors(theme, Colors.bottomControlsLabel),
                    },
                  ]}>
                  {trackInfo?.artist}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.title,
                    {
                      color: getColors(theme, Colors.bottomControlsLabel),
                    },
                  ]}>
                  {trackInfo?.title}
                </Text>
              </Animatable.View>
            </View>
          </View>
          <Image
            style={[
              styles.cover,
              {
                borderColor: getColors(theme, Colors.bottomControlsLabel),
              },
            ]}
            source={{uri: trackInfo?.artwork}}
          />
        </View>
      </View>
    </Animatable.View>
  );
});
