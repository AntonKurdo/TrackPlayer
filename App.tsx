import React, {useCallback, useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';

import data from './src/data/index';

import {TabNavigation} from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {SwipableModal} from './src/components/swipable-modal';
import {Splash} from './src/screens/splash';
import {PlayerControls} from './src/components/player-controls';
import {appObserver} from './src/state-management/utils';
import {playerModalState} from './src/state-management';
import {setupInitialTrack} from './src/utils/player-setup';
import ThemeProvider from './src/context/theme-context/theme-context';

LogBox.ignoreLogs([
  "FlashList's rendered size is not usable. Either the height or width is too small (<2px). Please make sure that the parent view of the list has a valid size. FlashList will match the size of the parent",
]);

const App = appObserver((): JSX.Element => {
  const [appInit, setAppInit] = useState(true);

  const closeModal = useCallback(() => playerModalState.closeModal(), []);

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(data);

        setupInitialTrack();
        setupInitialTrack();

        setAppInit(false);
      } catch (error) {
        console.error({error});
      }
    };

    setupPlayer();
  }, []);

  if (appInit) {
    return (
      <ThemeProvider>
        <Splash />
      </ThemeProvider>
    );
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <NavigationContainer>
          <TabNavigation />
          <SwipableModal
            propagateSwipe
            useNativeDriverForBackdrop
            isVisible={playerModalState.isOpen}
            closeModal={closeModal}>
            <PlayerControls
              isVisible={playerModalState.isOpen}
              onClose={closeModal}
            />
          </SwipableModal>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
});

export default App;
