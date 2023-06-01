import React, {FC, useCallback} from 'react';
import {FlatList} from 'react-native';

import {TrackType} from '../../data/types';

import {ListItem} from './components/list-item';

import {styles} from './player.styles';

type PlayerProps = {
  data: TrackType[];
};

export const PlayerList: FC<PlayerProps> = ({data}) => {
  const keyExtractor = useCallback((item: TrackType) => item.id.toString(), []);

  const renderItem = useCallback(
    ({item, index}: {item: TrackType; index: number}) => {
      return (
        <ListItem
          track={item}
          index={index}
          isLast={index === data.length - 1}
        />
      );
    },
    [data.length],
  );

  return (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};