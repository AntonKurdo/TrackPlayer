import React from 'react';
import {View, Text, useColorScheme} from 'react-native';

import {styles} from './favourites.styles';
import {Colors, getColors} from '../../style/colors';

export const Favourites = () => {
  const theme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getColors(theme, Colors.background),
        },
      ]}>
      <Text>Hello</Text>
    </View>
  );
};
