import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors, getColors} from '../../style/colors';
import {PlayerList} from '../player';

import {styles} from './main.styles';

export const Main = () => {
  const theme = useColorScheme();

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: getColors(theme, Colors.background),
          },
        ]}>
        <PlayerList />
      </SafeAreaView>
    </>
  );
};
