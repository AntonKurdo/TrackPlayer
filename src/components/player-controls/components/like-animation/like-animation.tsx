import React, {forwardRef} from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {Icon} from '../../../icon';

import {styles} from './like-animation.styles';

type Props = {
  isLiked: boolean;
};

export const LikeAnimation = forwardRef(
  ({isLiked}: Props, ref: React.ForwardedRef<Animatable.View & View>) => {
    return (
      <View style={styles.container}>
        <Animatable.View
          style={styles.initialOpacity}
          ref={ref}
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
);
