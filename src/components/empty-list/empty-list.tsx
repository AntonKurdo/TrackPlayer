import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

import {styles} from './empty-list.styles';

export const EmptyList = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.iconStyles}
        source={require('../../assets/lottie-animations/empty.json')}
        autoPlay
      />
    </View>
  );
};
