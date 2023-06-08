import React, {FC} from 'react';
import {Text, View, useColorScheme} from 'react-native';

import {styles} from './header.styles';
import {Colors, getColors} from '../../style/colors';

type Props = {
  title?: string;
  headerRight?: React.ReactNode;
};

export const Header: FC<Props> = ({title, headerRight}) => {
  const theme = useColorScheme();

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
