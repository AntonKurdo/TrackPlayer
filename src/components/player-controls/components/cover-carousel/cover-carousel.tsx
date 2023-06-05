import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {Dimensions, View, FlatList, ViewToken} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import {ListItem} from './components/list-item';
import {TrackType} from '../../../../data/types';

import {styles} from './cover-carousel.styles';

type Props = {
  onViewableItemsChanged:
    | ((info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => void)
    | null
    | undefined;
  initialIndex: number;
  onFavouriteChanged: (isLiked: boolean) => void;
};

export const CoverCarousel = forwardRef(
  (
    {onViewableItemsChanged, initialIndex = 0, onFavouriteChanged}: Props,
    ref: ForwardedRef<FlatList<TrackType>> | any,
  ) => {
    const [data, setData] = useState<TrackType[]>([]);

    useEffect(() => {
      TrackPlayer.getQueue().then(tracks => {
        setData(tracks as TrackType[]);
      });
    }, []);

    const renderItem = useCallback(
      ({item}: {item: TrackType}) => {
        return (
          <ListItem favouritesHandler={onFavouriteChanged} trackInfo={item} />
        );
      },
      [onFavouriteChanged],
    );
    const keyExtractor = useCallback(
      (item: TrackType) => item.id.toString(),
      [],
    );

    const getItemLayout = useCallback(
      (_data: TrackType[] | null | undefined, index: number) => {
        return {
          length: Dimensions.get('screen').width - 40,
          offset: (Dimensions.get('screen').width - 40) * index,
          index,
        };
      },
      [],
    );

    const onLayout = useCallback(() => {
      ref?.current?.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }, [initialIndex, ref]);

    return (
      <View style={styles.container}>
        <FlatList
          ref={ref}
          data={data}
          horizontal
          pagingEnabled
          onLayout={onLayout}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={data.length}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  },
);
