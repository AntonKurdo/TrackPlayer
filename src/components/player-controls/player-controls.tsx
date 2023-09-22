import React, {useCallback, useEffect, useState, useRef, useMemo} from 'react';
import {
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewToken,
} from 'react-native';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  State,
  RepeatMode,
} from 'react-native-track-player';
import * as Animatable from 'react-native-animatable';

import {TrackType} from '../../data/types';
import {Colors, getColors} from '../../style/colors';
import {IconButton} from '../icon-button';
import {TrackProgress} from '../track-progress';
import {Icon} from '../icon';
import {checkPostionOfTrack} from './utils';
import {appObserver, appComputed} from '../../state-management/utils';
import {favouritesListState} from '../../state-management';
import {zoomOutAnimation} from '../../utils/animation';
import {CoverCarousel} from './components/cover-carousel';
import {Storage} from '../../services/storage';
import {withTheme} from '../../hocs/with-theme';

import {styles} from './player-controls.styles';

type PlayerControlsType = {
  isVisible: boolean;
  onClose: () => void;
};

export const PlayerControls = appObserver(
  withTheme<PlayerControlsType>(({isVisible, onClose, theme}) => {
    const coversListRef = useRef<FlatList<TrackType>>(null);
    const currentCoverIndex = useRef<number | null>(null);
    const likeRef = useRef<
      Animatable.View & View & {animate: (params: unknown) => void}
    >(null);

    const [trackInfo, setTrackInfo] = useState<TrackType | undefined>(
      undefined,
    );
    const [initialTrackIndex, setInitialTrackIndex] = useState(0);
    const [playbackState, setPlaybackState] = useState(State.Ready);
    const [isSpreadTitle, setSpreadTitle] = useState(false);
    const [repeatMode, setRepeatMode] = useState<RepeatMode>(
      Storage.getInt(Storage.storageKeys.repeatMode) || RepeatMode.Off,
    );
    const [isPrevDisabled, setPrevDisabled] = useState(false);
    const [isNextDisabled, setNextDisabled] = useState(false);

    const isTrackLiked = useMemo(() => {
      return appComputed(
        () => !!favouritesListState.list.find(el => el.id === trackInfo?.id),
      );
    }, [trackInfo?.id]).get();

    useEffect(() => {
      if (isVisible) {
        TrackPlayer.getCurrentTrack().then(async track => {
          setInitialTrackIndex(track!);

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

          coversListRef.current?.scrollToIndex({
            index: event.nextTrack,
          });
          currentCoverIndex.current = event.nextTrack;

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

    const onViewableItemsChanged = useCallback(
      async ({changed}: {changed: ViewToken[]}) => {
        const newIndex = changed[0].index;

        currentCoverIndex.current = newIndex;

        const trackPosition = await TrackPlayer.getCurrentTrack();
        if (newIndex !== trackPosition) {
          TrackPlayer.skip(changed[0].index!);
        }
      },
      [],
    );

    const switchRepeatMode = useCallback(async () => {
      if (repeatMode === RepeatMode.Off) {
        try {
          await TrackPlayer.setRepeatMode(RepeatMode.Track);
          setRepeatMode(RepeatMode.Track);
          Storage.setInt(Storage.storageKeys.repeatMode, RepeatMode.Track);
        } catch (error) {
          console.error({error});
        }
      } else {
        try {
          await TrackPlayer.setRepeatMode(RepeatMode.Off);
          setRepeatMode(RepeatMode.Off);
          Storage.setInt(Storage.storageKeys.repeatMode, RepeatMode.Off);
        } catch (error) {
          console.error({error});
        }
      }
    }, [repeatMode]);

    const favouritesHandler = useCallback(
      (isLiked: boolean) => {
        if (!trackInfo?.id) {
          return;
        }

        if (isLiked) {
          favouritesListState.removeTrackFromFavourites(trackInfo.id);
        } else {
          favouritesListState.addTrackToFavourites(trackInfo);
        }

        likeRef?.current?.animate(zoomOutAnimation);
      },
      [trackInfo],
    );

    const toggleSpreadTitle = useCallback(
      () => setSpreadTitle(!isSpreadTitle),
      [isSpreadTitle],
    );

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
            <CoverCarousel
              ref={coversListRef}
              initialIndex={initialTrackIndex}
              onViewableItemsChanged={onViewableItemsChanged}
              onFavouriteChanged={favouritesHandler}
            />

            <View style={styles.innerWrapper}>
              <TouchableWithoutFeedback onPress={toggleSpreadTitle}>
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
                        isPrevDisabled
                          ? 'gray'
                          : getColors(theme, Colors.button)
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
                        isNextDisabled
                          ? 'gray'
                          : getColors(theme, Colors.button)
                      }
                    />
                  }
                  onPress={skipToNext}
                />
                <IconButton
                  containerStyle={styles.likeButton}
                  icon={
                    <Icon
                      name={isTrackLiked ? 'heart' : 'hearto'}
                      size={20}
                      color={getColors(theme, Colors.button)}
                    />
                  }
                  onPress={favouritesHandler.bind(null, isTrackLiked)}
                />
              </View>
            </View>
            <View style={styles.paddingWrapper}>
              <TrackProgress />
            </View>
          </>
        )}
      </View>
    );
  }),
);
