import React, {FC, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedReaction,
  scrollTo,
  useAnimatedRef,
} from 'react-native-reanimated';
import {useUpdateEffect} from 'react-use';

import {favouritesListState} from '../../state-management';
import {TrackType} from '../../data/types';
import {EmptyList} from '../empty-list';
import {MovableTrack} from './components/movable-track';
import {listToObject, objectToList} from './utils';

import {styles} from './player.styles';

type PlayerProps = {
  data: TrackType[];
  loading?: boolean;
  withSweapable?: boolean;
  isDragActive?: boolean;
};

export const TRACK_HEIGHT = 60;

export const PlayerList: FC<PlayerProps> = ({
  data,
  loading,
  withSweapable,
  isDragActive,
}) => {
  const positions = useSharedValue({});

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  const scrollY = useSharedValue(0);

  useEffect(() => {
    if (data.length) {
      positions.value = listToObject(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useUpdateEffect(() => {
    if (!isDragActive) {
      const updatedData = objectToList(positions.value);
      favouritesListState.updateList(updatedData);
    }
  }, [isDragActive]);

  useAnimatedReaction(
    () => scrollY.value,
    currentValue => {
      if (isDragActive) {
        scrollTo(scrollViewRef, 0, currentValue, true);
      }
    },
    [isDragActive],
  );

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  if (loading) {
    return (
      <View style={styles.loadingStyles}>
        <ActivityIndicator />
      </View>
    );
  }

  if (data.length === 0) {
    return <EmptyList />;
  }

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{height: data.length * TRACK_HEIGHT}}>
      {data.map((t, index) => {
        return (
          <MovableTrack
            isDragActive={isDragActive}
            positions={positions}
            id={t.id}
            key={t.id}
            track={t}
            index={index}
            dataLength={data.length}
            withSweapable={isDragActive ? false : withSweapable}
            scrollY={scrollY}
          />
        );
      })}
    </Animated.ScrollView>
  );
};
