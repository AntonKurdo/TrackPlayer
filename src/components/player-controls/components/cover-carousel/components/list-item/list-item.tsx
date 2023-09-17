import React, {FC, useContext, useMemo, useRef} from 'react';
import {Image, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useUpdateEffect} from 'react-use';
import {runOnJS} from 'react-native-reanimated';

import {TrackType} from '../../../../../../data/types';
import {LikeAnimation} from '../../../like-animation';
import {
  appComputed,
  appObserver,
} from '../../../../../../state-management/utils';
import {favouritesListState} from '../../../../../../state-management';
import {zoomOutAnimation} from '../../../../../../utils/animation';
import {Colors, getColors} from '../../../../../../style/colors';
import {ThemeContext} from '../../../../../../context/theme-context/theme-context';
import {ThemeContextType} from '../../../../../../context/theme-context/theme-context.types';

import {styles} from './list-item.styles';

type Props = {
  trackInfo: TrackType;
  favouritesHandler: (isLiked: boolean) => void;
};

export const ListItem: FC<Props> = appObserver(
  ({favouritesHandler, trackInfo}) => {
    const {theme} = useContext(ThemeContext) as ThemeContextType;
    const animationRef = useRef<
      Animatable.View &
        View & {
          animate: (params: unknown) => void;
        }
    >(null);

    const isTrackLiked = useMemo(() => {
      return appComputed(
        () => !!favouritesListState.list.find(el => el.id === trackInfo?.id),
      );
    }, [trackInfo?.id]).get();

    useUpdateEffect(() => {
      animationRef.current?.animate(zoomOutAnimation);
    }, [isTrackLiked]);

    const onDoubleTap = Gesture.Tap()
      .numberOfTaps(2)
      .onStart(runOnJS(() => favouritesHandler(isTrackLiked)));

    return (
      <GestureDetector gesture={onDoubleTap}>
        <Animatable.View
          animation={'fadeIn'}
          duration={350}
          onStartShouldSetResponder={() => true}
          style={styles.coverWrapper}>
          <View
            style={[
              styles.innerWrapper,
              {
                backgroundColor: getColors(theme, Colors.background),
                shadowColor: getColors(theme, Colors.label),
              },
            ]}>
            <Image style={styles.cover} source={{uri: trackInfo.artwork}} />
            <LikeAnimation isLiked={isTrackLiked} ref={animationRef} />
          </View>
        </Animatable.View>
      </GestureDetector>
    );
  },
);
