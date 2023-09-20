import React, {FC, useContext} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

import {Colors, getColors} from '../../style/colors';
import {ThemeContext} from '../../context/theme-context/theme-context';
import {ThemeContextType} from '../../context/theme-context/theme-context.types';

import {styles} from './splash.styles';

type Props = {
  onAnimationFinish: () => void;
};

export const Splash: FC<Props> = ({onAnimationFinish}) => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;

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
};
