import React, {FC, useCallback, useRef} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

import {styles} from './swipeable-button.styles';

type Props = {
  children: React.ReactNode;
  onPress: () => void;
};

export const SwipeableButton: FC<Props> = ({children, onPress}) => {
  const ref = useRef<Swipeable>(null);

  const renderRightAction = useCallback(
    (
      progress: Animated.AnimatedInterpolation<string | number>,
      dragX: Animated.AnimatedInterpolation<string | number>,
    ) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [70, 0],
      });

      const scale = dragX.interpolate({
        inputRange: [-100, -50, 0],
        outputRange: [1, 1, 0],
      });
      const opacity = dragX.interpolate({
        inputRange: [-50, 0],
        outputRange: [0.7, 0],
      });

      return (
        <Animated.View
          style={[
            styles.renderRightActionWrapper,
            {
              opacity,
              transform: [{translateX: trans}],
            },
          ]}>
          <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <Animated.Text
              style={[
                styles.renderRightActionLabel,
                {
                  transform: [
                    {
                      scale,
                    },
                  ],
                },
              ]}>
              Unlike
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [onPress],
  );

  return (
    <Swipeable
      ref={ref}
      overshootLeft={false}
      overshootRight={false}
      friction={1.5}
      rightThreshold={40}
      renderRightActions={renderRightAction}>
      {children}
    </Swipeable>
  );
};
