import React, {FC, useCallback} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';

import {TrackType} from '../../data/types';

import {ListItem} from './components/list-item';
import {EmptyList} from '../empty-list';

import {styles} from './player.styles';

type PlayerProps = {
  data: TrackType[];
  loading?: boolean;
  withSweapable?: boolean;
};

export const PlayerList: FC<PlayerProps> = ({data, loading, withSweapable}) => {
  const keyExtractor = useCallback((item: TrackType) => item.id.toString(), []);

  const renderItem = useCallback(
    ({item, index}: {item: TrackType; index: number}) => {
      return (
        <ListItem
          track={item}
          index={index}
          isLast={index === data.length - 1}
          withSweapable={withSweapable}
        />
      );
    },
    [data.length, withSweapable],
  );

  if (loading) {
    return (
      <View style={styles.loadingStyles}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      scrollEnabled={!!data.length}
      ListEmptyComponent={EmptyList}
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};
