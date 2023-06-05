import React, {useCallback, useEffect, useState} from 'react';
import {
  StatusBar,
  useColorScheme,
  ActivityIndicator,
  View,
  LogBox,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
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

LogBox.ignoreLogs([
  "FlashList's rendered size is not usable. Either the height or width is too small (<2px). Please make sure that the parent view of the list has a valid size. FlashList will match the size of the parent",
]);

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
    const lastTrackId = Storage.getInt(Storage.storageKeys.lastTrackId);

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
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar
          barStyle={theme === Theme.dark ? 'light-content' : 'dark-content'}
        />
        <TabNavigation />
        <SwipableModal
          propagateSwipe
          isVisible={playerModalState.isOpen}
          closeModal={closeModal}>
          <PlayerControls
            theme={theme}
            isVisible={playerModalState.isOpen}
            onClose={closeModal}
          />
        </SwipableModal>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
});

export default App;
