import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

import {withTheme} from '../../hocs/with-theme';
import {Colors, getColors} from '../../style/colors';

import {styles} from './splash.styles';

type Props = {
  onAnimationFinish: () => void;
};

export const Splash = withTheme<Props>(({onAnimationFinish, theme}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getColors(theme, Colors.background),
        },
      ]}>
      <LottieView
        speed={1.2}
        onAnimationFinish={onAnimationFinish}
        style={styles.lottie}
        loop={false}
        source={require('../../assets/lottie-animations/music.json')}
        autoPlay
      />
    </View>
  );
});
