import React, {FC, useContext} from 'react';
import {Text, View} from 'react-native';

import {styles} from './header.styles';
import {Colors, getColors} from '../../style/colors';
import {ThemeContext} from '../../context/theme-context/theme-context';
import {ThemeContextType} from '../../context/theme-context/theme-context.types';

type Props = {
  title?: string;
  headerRight?: React.ReactNode;
};

export const Header: FC<Props> = ({title, headerRight}) => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: getColors(theme, Colors.label),
        },
      ]}>
      {title && (
        <Text
          style={[
            styles.titleLabel,
            {
              color: getColors(theme, Colors.label),
            },
          ]}>
          {title}
        </Text>
      )}
      {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
    </View>
  );
};
