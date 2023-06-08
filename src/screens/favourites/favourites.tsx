import React, {useCallback, useMemo, useState} from 'react';
import {SafeAreaView, View, useColorScheme} from 'react-native';

import {PlayerList} from '../../components/player-list';
import {Colors, getColors} from '../../style/colors';
import {favouritesListState} from '../../state-management';
import {appObserver, appToJS} from '../../state-management/utils';
import {Header} from '../../components/header';

import {styles} from './favourites.styles';
import {IconButton} from '../../components/icon-button';
import {Icon} from '../../components/icon';
import TrackPlayer from 'react-native-track-player';

export const Favourites = appObserver(() => {
  const theme = useColorScheme();

  const [isDragActive, setDragActive] = useState(false);

  const dragToggle = useCallback(async () => {
    if (!isDragActive) {
      await TrackPlayer.pause();
    }
    setDragActive(!isDragActive);
  }, [isDragActive]);

  const headerRight = useMemo(
    () => (
      <View>
        <IconButton
          onPress={dragToggle}
          icon={
            <Icon
              name="drag-indicator"
              size={30}
              type="Material"
              color={
                isDragActive
                  ? getColors(theme, Colors.yellow)
                  : getColors(theme, Colors.label)
              }
            />
          }
        />
      </View>
    ),
    [dragToggle, isDragActive, theme],
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: getColors(theme, Colors.background),
        },
      ]}>
      <Header title="Favourites" headerRight={headerRight} />
      <PlayerList
        withSweapable
        isDragActive={isDragActive}
        data={appToJS(favouritesListState.list)}
      />
    </SafeAreaView>
  );
});
