import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {Colors, getColors} from '../../style/colors';
import {ThemeContext} from '../../context/theme-context/theme-context';
import {ThemeContextType} from '../../context/theme-context/theme-context.types';

import {styles} from './splash.styles';

export const Splash = () => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={'large'}
        color={getColors(theme, Colors.yellow)}
      />
    </View>
  );
};
