import React, {FC, useContext, useState} from 'react';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

import {ThemeContext} from '../../../../context/theme-context/theme-context';
import {ThemeContextType} from '../../../../context/theme-context/theme-context.types';
import {Icon} from '../../../icon';
import {ListItem} from '../list-item';
import {clamp, objectMove} from './utils';
import {TrackType} from '../../../../data/types';
import {SharedValue} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper';
import {TRACK_HEIGHT} from '../../player';
import {HEADER_HEIGHT} from '../../../header/header.styles';
import {Colors, getColors} from '../../../../style/colors';
import {DraggbleDataObject} from '../../types';

import {styles} from './movable-track.styles';

type Props = {
  track: TrackType;
  index: number;
  withSweapable?: boolean;
  dataLength: number;
  id: TrackType['id'];
  scrollY: SharedValue<number>;
  positions: SharedValue<DraggbleDataObject>;
  isDragActive?: boolean;
  onDragComplete?: () => void;
};

export const MovableTrack: FC<Props> = ({
  track,
  index,
  withSweapable,
  dataLength,
  scrollY,
  id,
  positions,
  isDragActive,
  onDragComplete,
}) => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const [moving, setMoving] = useState(false);
  // const dimensions = useWindowDimensions();

  // const insets = useSafeAreaInsets();

  const top = useSharedValue(
    (positions.value[id]?.index || index) * TRACK_HEIGHT,
  );

  useAnimatedReaction(
    () => positions.value[id],
    (currentValue, previousValue) => {
      if (currentValue?.index !== previousValue?.index) {
        if (!moving) {
          top.value = withSpring(currentValue.index * TRACK_HEIGHT);
        }
      }
    },
    [moving],
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      const positionY = event.absoluteY - HEADER_HEIGHT + scrollY.value;

      // if (positionY <= scrollY.value + HEADER_HEIGHT + 100) {
      //   // Scroll up

      //   scrollY.value = withTiming(0, {duration: 100});
      // } else if (positionY >= scrollY.value + dimensions.height - 200) {
      //   // Scroll down

      //   const contentHeight = dataLength * TRACK_HEIGHT;
      //   const containerHeight = dimensions.height - insets.top - insets.bottom;
      //   const maxScroll = contentHeight - containerHeight;
      //   scrollY.value = withTiming(maxScroll, {duration: 100});
      // } else {
      //   cancelAnimation(scrollY);
      // }

      top.value = withTiming(positionY - TRACK_HEIGHT, {
        duration: 16,
      });

      const newPosition = clamp(
        Math.floor(positionY / TRACK_HEIGHT),
        0,
        dataLength - 1,
      );

      if (newPosition !== positions.value[id]?.index) {
        positions.value = objectMove(
          positions.value,
          positions.value[id]?.index,
          newPosition,
        );
      }
    },
    onFinish() {
      top.value = positions.value[id]?.index * TRACK_HEIGHT;
      runOnJS(setMoving)(false);
      if (onDragComplete) {
        runOnJS(onDragComplete)();
      }
    },
  });

  const animatedStyles = useAnimatedStyle(
    () => ({
      top: top.value,
      zIndex: moving ? 1 : 0,
    }),
    [moving],
  );

  const DragAreaComponent = (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={styles.dragAreaComponent}>
        <Icon
          type="Material"
          name="drag-handle"
          size={35}
          color={getColors(theme, Colors.label)}
        />
      </Animated.View>
    </PanGestureHandler>
  );

  return (
    <Animated.View
      style={[
        animatedStyles,
        styles.animatedItem,
        {
          backgroundColor: getColors(theme, Colors.background),
        },
      ]}>
      <ListItem
        isDragActive={isDragActive}
        DragAreaComponent={DragAreaComponent}
        track={track}
        isLast={isDragActive ? true : index === dataLength - 1}
        withSweapable={withSweapable}
      />
    </Animated.View>
  );
};
