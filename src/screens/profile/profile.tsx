import React, {useContext} from 'react';
import {View} from 'react-native';

import {ThemeContext} from '../../context/theme-context/theme-context';
import {ThemeContextType} from '../../context/theme-context/theme-context.types';
import {Colors, getColors} from '../../style/colors';
import {IconButton} from '../../components/icon-button';
import {Icon} from '../../components/icon';

import {styles} from './profile.styles';

export const Profile = () => {
  const {theme, updateTheme} = useContext(ThemeContext) as ThemeContextType;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getColors(theme, Colors.background),
        },
      ]}>
      <IconButton
        icon={
          <Icon
            type={'MaterialCommunity'}
            name="theme-light-dark"
            size={30}
            color={getColors(theme, Colors.button)}
          />
        }
        containerStyle={styles.themeBtn}
        onPress={updateTheme}
      />
    </View>
  );
};
