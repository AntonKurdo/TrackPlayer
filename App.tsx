import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, useColorScheme, ActivityIndicator, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import data from './src/data/index';
import {Theme} from './src/style/colors';
import {TabNavigation} from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {SwipableModal} from './src/components/swipable-modal';
import {PlayerControls} from './src/components/player-controls';
import {appObserver} from './src/state-management/utils';
import {playerModalState} from './src/state-management';
import {Storage} from './src/services/storage';

const App = appObserver((): JSX.Element => {
  const theme = useColorScheme();

  const [appInit, setAppInit] = useState(true);

  const closeModal = useCallback(() => playerModalState.closeModal(), []);

  useEffect(() => {
    setupPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(data);
      finishInitialization();
    } catch (error) {
      console.error({error});
    }
  };

  const finishInitialization = useCallback(async () => {
    const lastTrackId = Storage.getInt(Storage.storageNames.lastTrackId);

    if (lastTrackId) {
      const position = (await TrackPlayer.getQueue()).findIndex(
        el => el.id === lastTrackId,
      );

      if (position) {
        TrackPlayer.skip(position);
      }
    }
    setAppInit(false);
  }, []);

  if (appInit) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={theme === Theme.dark ? 'light-content' : 'dark-content'}
      />
      <TabNavigation />
      <SwipableModal
        isVisible={playerModalState.isOpen}
        closeModal={closeModal}>
        <PlayerControls
          theme={theme}
          isVisible={playerModalState.isOpen}
          onClose={closeModal}
        />
      </SwipableModal>
    </NavigationContainer>
  );
});

export default App;
