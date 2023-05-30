import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ActivityIndicator,
  View,
} from 'react-native';

import data from './src/data/index';
import TrackPlayer from 'react-native-track-player';
import {PlayerControls} from './src/components/player-controls';
import {PlayerList} from './src/screens/player';
import {BottomControls} from './src/components/bottom-controls';
import {Colors, Theme, getColors} from './src/style/colors';
import {SwipableModal} from './src/components/swipable-modal';

function App(): JSX.Element {
  const theme = useColorScheme();

  const [appInit, setAppInit] = useState(true);

  const [isOpenPlayerModal, setPlayerModal] = useState(false);

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

  const finishInitialization = useCallback(() => {
    setAppInit(false);
  }, []);

  const openModal = useCallback(() => setPlayerModal(true), []);

  const closeModal = useCallback(() => setPlayerModal(false), []);

  if (appInit) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: getColors(theme, Colors.background),
        }}>
        <StatusBar
          barStyle={theme === Theme.dark ? 'light-content' : 'dark-content'}
        />

        <PlayerList />
        <SwipableModal isVisible={isOpenPlayerModal} closeModal={closeModal}>
          <PlayerControls
            theme={theme}
            isVisible={isOpenPlayerModal}
            onClose={closeModal}
          />
        </SwipableModal>
      </SafeAreaView>
      <BottomControls openModal={openModal} />
    </>
  );
}

export default App;
