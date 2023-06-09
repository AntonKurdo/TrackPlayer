import React from 'react';
import {ActivityIndicator, View, useColorScheme} from 'react-native';

import {Colors, getColors} from '../../style/colors';

import {styles} from './splash.styles';

export const Splash = () => {
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={'large'}
        color={getColors(theme, Colors.yellow)}
      />
    </View>
  );
};
