import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {PlayerList} from '../../components/player-list';
import {Colors, getColors} from '../../style/colors';
import {favouritesListState} from '../../state-management';
import {appObserver} from '../../state-management/utils';

import {styles} from './favourites.styles';

export const Favourites = appObserver(() => {
  const theme = useColorScheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: getColors(theme, Colors.background),
        },
      ]}>
      <PlayerList withSweapable data={favouritesListState.list} />
    </SafeAreaView>
  );
});
