import React, {useContext} from 'react';
import {View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {ThemeContext} from '../../context/theme-context/theme-context';
import {ThemeContextType} from '../../context/theme-context/theme-context.types';
import {Colors, getColors} from '../../style/colors';
import {Icon} from '../../components/icon';

import {styles} from './profile.styles';

export const Profile = () => {
  const {theme, toggleTheme, isThemeAnimationActive} = useContext(
    ThemeContext,
  ) as ThemeContextType;

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(event => {
      if (!isThemeAnimationActive) {
        toggleTheme({
          x: event.absoluteX,
          y: event.absoluteY,
        });
      }
    });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getColors(theme, Colors.background),
        },
      ]}>
      <GestureDetector gesture={pan}>
        <View style={styles.themeBtn}>
          <Icon
            type={'MaterialCommunity'}
            name="theme-light-dark"
            size={30}
            color={getColors(theme, Colors.button)}
          />
        </View>
      </GestureDetector>
    </View>
  );
};
