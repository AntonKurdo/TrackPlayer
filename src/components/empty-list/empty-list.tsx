import React, {useContext} from 'react';
import {Image, View, Text} from 'react-native';

import {ThemeContext} from '../../context/theme-context/theme-context';
import {ThemeContextType} from '../../context/theme-context/theme-context.types';
import {Colors, getColors} from '../../style/colors';

import {styles} from './empty-list.styles';

const emptyImage = require('../../assets/images/empty-folder.png');

export const EmptyList = () => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
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
