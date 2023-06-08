import React, {forwardRef, memo} from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {Icon} from '../../../icon';

import {styles} from './like-animation.styles';

type Props = {
  isLiked: boolean;
};

export const LikeAnimation = memo(
  forwardRef(
    ({isLiked}: Props, ref: React.ForwardedRef<Animatable.View & View>) => {
      return (
        <View style={styles.container}>
          <Animatable.View
            ref={ref}
            style={styles.initialOpacity}
            duration={1300}>
            <Icon
              name={!isLiked ? 'hearto' : 'heart'}
              size={90}
              color={'white'}
            />
          </Animatable.View>
        </View>
      );
    },
  ),
);
