import React, {FC} from 'react';
import {ViewStyle} from 'react-native';
import LottieView, {AnimationObject} from 'lottie-react-native';

type Props = {
  source: string | AnimationObject | {uri: string};
  speed?: number;
  onAnimationFinish?: () => void;
  loop?: boolean;
  autoPlay?: boolean;
  style?: ViewStyle;
};

export const LottieViewComponent: FC<Props> = ({
  source,
  onAnimationFinish,
  style,
  speed,
  loop,
  autoPlay,
}) => {
  return (
    <LottieView
      source={source}
      speed={speed}
      onAnimationFinish={onAnimationFinish}
      style={style}
      loop={loop}
      autoPlay={autoPlay}
    />
  );
};
