import React, {useCallback, useEffect, useState, FC, useRef} from 'react';
import {
  ColorSchemeName,
  GestureResponderEvent,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  State,
  RepeatMode,
} from 'react-native-track-player';

import {TrackType} from '../../data/types';
import {Colors, getColors} from '../../style/colors';
import {IconButton} from '../icon-button';
import {TrackProgress} from '../track-progress';
import {Icon} from '../icon';
import {checkPostionOfTrack} from './utils';
import {appObserver} from '../../state-management/utils';

import {styles} from './player-controls.styles';

type PlayerControlsType = {
  isVisible: boolean;
  onClose: () => void;
  theme: ColorSchemeName;
};

export const PlayerControls: FC<PlayerControlsType> = appObserver(
  ({isVisible, onClose, theme}) => {
    const touchX = useRef(0);

    const [trackInfo, setTrackInfo] = useState<TrackType | undefined>(
      undefined,
    );

    const [playbackState, setPlaybackState] = useState(State.Ready);

    const [isSpreadTitle, setSpreadTitle] = useState(false);

    const [repeatMode, setRepeatMode] = useState<RepeatMode | undefined>(
      RepeatMode.Off,
    );

    const [isPrevDisabled, setPrevDisabled] = useState(false);
    const [isNextDisabled, setNextDisabled] = useState(false);

    useEffect(() => {
      if (isVisible) {
        TrackPlayer.getCurrentTrack().then(async track => {
          const mode = await TrackPlayer.getRepeatMode();
          setRepeatMode(mode);
          const currentTrack = await TrackPlayer.getTrack(track as number);
          setTrackInfo(currentTrack as TrackType);

          const state = await TrackPlayer.getState();

          setPlaybackState(state);

          const queue = await TrackPlayer.getQueue();

          checkPostionOfTrack({
            trackPosition: track as number,
            onNextDisabled: setNextDisabled,
            onPrevDisabled: setPrevDisabled,
            isNextDisabled: isNextDisabled,
            isPrevDisabled: isPrevDisabled,
            queueLength: queue.length,
          });
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    useTrackPlayerEvents(
      [Event.PlaybackTrackChanged, Event.PlaybackState],
      async event => {
        if (
          event.type === Event.PlaybackTrackChanged &&
          event.nextTrack != null
        ) {
          const track = await TrackPlayer.getTrack(event.nextTrack);
          const queue = await TrackPlayer.getQueue();

          checkPostionOfTrack({
            trackPosition: event.nextTrack,
            onNextDisabled: setNextDisabled,
            onPrevDisabled: setPrevDisabled,
            isNextDisabled: isNextDisabled,
            isPrevDisabled: isPrevDisabled,
            queueLength: queue.length,
          });

          if (track) {
            setTrackInfo(track as TrackType);
            setSpreadTitle(false);
          }
        }

        if (
          event.type === Event.PlaybackState &&
          event.state === State.Playing
        ) {
          setPlaybackState(event.state);
        }
        if (
          event.type === Event.PlaybackState &&
          event.state === State.Paused
        ) {
          setPlaybackState(event.state);
        }
      },
    );

    const play = useCallback(() => {
      TrackPlayer.play();
    }, []);

    const pause = useCallback(() => {
      TrackPlayer.pause();
    }, []);

    const skipToPrevious = useCallback(
      async () => await TrackPlayer.skipToPrevious(),
      [],
    );

    const skipToNext = useCallback(
      async () => await TrackPlayer.skipToNext(),
      [],
    );

    const switchRepeatMode = useCallback(async () => {
      if (repeatMode === RepeatMode.Off) {
        try {
          await TrackPlayer.setRepeatMode(RepeatMode.Track);
          setRepeatMode(RepeatMode.Track);
        } catch (error) {
          console.log({error});
        }
      } else {
        try {
          await TrackPlayer.setRepeatMode(RepeatMode.Off);
          setRepeatMode(RepeatMode.Off);
        } catch (error) {
          console.log({error});
        }
      }
    }, [repeatMode]);

    const onTouchStart = (evt: GestureResponderEvent) => {
      touchX.current = evt.nativeEvent.pageX;
    };

    const onTouchEnd = async (evt: GestureResponderEvent) => {
      evt.persist();
      try {
        if (
          touchX.current - evt.nativeEvent.pageX < 10 &&
          touchX.current - evt.nativeEvent.pageX > -10
        ) {
          return;
        }
        const track = await TrackPlayer.getCurrentTrack();
        const queue = await TrackPlayer.getQueue();

        if (touchX.current - evt.nativeEvent.pageX < 0 && track !== 0) {
          await TrackPlayer.skipToPrevious();
        }
        if (
          touchX.current - evt.nativeEvent.pageX > 0 &&
          track !== queue.length - 1
        ) {
          await TrackPlayer.skipToNext();
        }
        touchX.current = 0;
      } catch (error) {
        console.error({error});
      }
    };

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: getColors(theme, Colors.background),
          },
        ]}>
        <IconButton
          containerStyle={styles.repeatButton}
          icon={
            <Icon
              type={'Ionicons'}
              name="repeat"
              size={25}
              color={
                repeatMode === RepeatMode.Off
                  ? getColors(theme, Colors.button)
                  : getColors(theme, Colors.yellow)
              }
            />
          }
          onPress={switchRepeatMode}
        />
        <IconButton
          containerStyle={styles.closeButton}
          icon={
            <Icon
              name="down"
              color={getColors(theme, Colors.label)}
              size={25}
            />
          }
          onPress={onClose}
        />

        {trackInfo && (
          <>
            <View
              style={styles.coverWrapper}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}>
              <Image style={styles.cover} source={{uri: trackInfo?.artwork}} />
            </View>
            <TouchableWithoutFeedback
              onPress={() => setSpreadTitle(!isSpreadTitle)}>
              <Text
                numberOfLines={isSpreadTitle ? undefined : 1}
                style={[
                  {
                    color: getColors(theme, Colors.label),
                  },
                  styles.title,
                ]}>
                {trackInfo?.title}
              </Text>
            </TouchableWithoutFeedback>
            <Text
              style={[
                {
                  color: getColors(theme, Colors.label),
                },
                styles.artist,
              ]}>
              {trackInfo?.artist}
            </Text>
            <View style={styles.controlWrapper}>
              <IconButton
                disabled={isPrevDisabled}
                icon={
                  <Icon
                    name="stepbackward"
                    size={20}
                    color={
                      isPrevDisabled ? 'gray' : getColors(theme, Colors.button)
                    }
                  />
                }
                onPress={skipToPrevious}
              />
              <IconButton
                isSelected={playbackState === State.Playing}
                icon={
                  <Icon
                    name="play"
                    size={35}
                    color={getColors(theme, Colors.button)}
                  />
                }
                onPress={play}
              />
              <IconButton
                isSelected={playbackState === State.Paused}
                icon={
                  <Icon
                    name="pause"
                    size={35}
                    color={getColors(theme, Colors.button)}
                  />
                }
                onPress={pause}
              />
              <IconButton
                disabled={isNextDisabled}
                icon={
                  <Icon
                    name="stepforward"
                    size={20}
                    color={
                      isNextDisabled ? 'gray' : getColors(theme, Colors.button)
                    }
                  />
                }
                onPress={skipToNext}
              />
            </View>
            <TrackProgress />
          </>
        )}
      </View>
    );
  },
);
