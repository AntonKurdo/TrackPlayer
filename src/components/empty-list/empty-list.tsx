import React from 'react';
import {Image, View, Text, useColorScheme} from 'react-native';

import {styles} from './empty-list.styles';
import {Colors, getColors} from '../../style/colors';

const emptyImage = require('../../assets/images/empty-folder.png');

export const EmptyList = () => {
  const theme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: getColors(theme, Colors.label),
          },
        ]}>
        Empty list...
      </Text>
      <Image source={emptyImage} style={styles.iconStyles} />
    </View>
  );
};
