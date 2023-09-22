import React from 'react';
import {View} from 'react-native';

import {LottieViewComponent} from '../lottie-view-component';

import {styles} from './empty-list.styles';

export const EmptyList = () => {
  return (
    <View style={styles.container}>
      <LottieViewComponent
        autoPlay
        source={require('../../assets/lottie-animations/empty.json')}
        style={styles.iconStyles}
      />
    </View>
  );
};
