import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import {TrackType} from '../../data/types';

import {ListItem} from './components/list-item';

type PlayerProps = {};

export const PlayerList: FC<PlayerProps> = () => {
  const [trackList, setTrackList] = useState<TrackType[]>([]);

  useEffect(() => {
    TrackPlayer.getQueue().then(tracks => {
      setTrackList(tracks as TrackType[]);
    });
  }, []);

  const keyExtractor = useCallback((item: TrackType) => item.id.toString(), []);

  const renderItem = useCallback(
    ({item, index}: {item: TrackType; index: number}) => {
      return (
        <ListItem
          track={item}
          index={index}
          isLast={index === trackList.length - 1}
        />
      );
    },
    [trackList.length],
  );

  return (
    <FlatList
      data={trackList}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};
