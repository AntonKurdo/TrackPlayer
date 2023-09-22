import React from 'react';
import {Text, View} from 'react-native';

import {withTheme} from '../../hocs/with-theme';
import {Colors, getColors} from '../../style/colors';

import {styles} from './header.styles';

type Props = {
  title?: string;
  headerRight?: React.ReactNode;
};

export const Header = withTheme<Props>(({theme, title, headerRight}) => {
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
});
