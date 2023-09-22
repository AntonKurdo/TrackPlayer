import React, {useMemo, useCallback} from 'react';
import {View, Text, ViewStyle} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Slider} from '@miblanchard/react-native-slider';

import {withTheme} from '../../hocs/with-theme';
import {Colors, getColors} from '../../style/colors';
import {formatTime} from '../../utils/time';

import {styles} from './track-progress.styles';

type Props = {
  withTime?: boolean;
  containerStyles?: ViewStyle;
  sliderStyles?: ViewStyle;
  progressThumbStyles?: ViewStyle;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
};

export const TrackProgress = withTheme<Props>(
  ({
    theme,
    withTime = true,
    containerStyles = {},
    sliderStyles = {},
    progressThumbStyles = {},
    minimumTrackTintColor,
    maximumTrackTintColor,
  }) => {
    const progress = useProgress();

    const seekTo = useCallback((value: number[]) => {
      TrackPlayer.seekTo(value[0]);
    }, []);

    const durationBlock = useMemo(() => {
      if (progress.duration && withTime) {
        return (
          <Text
            style={[
              styles.time,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                color: getColors(theme, Colors.label),
                right: 0,
              },
            ]}>
            {formatTime(progress.duration)}
          </Text>
        );
      }
    }, [progress.duration, theme, withTime]);

    return (
      <View style={[styles.container, containerStyles]}>
        {withTime && (
          <Text
            style={[
              styles.time,
              // eslint-disable-next-line react-native/no-inline-styles
              {color: getColors(theme, Colors.label), left: 0},
            ]}>
            {formatTime(progress.position)}
          </Text>
        )}

        <Slider
          animateTransitions
          animationType="timing"
          containerStyle={{...styles.sliderStyle, ...sliderStyles}}
          minimumValue={0}
          maximumValue={progress.duration}
          minimumTrackTintColor={
            minimumTrackTintColor
              ? minimumTrackTintColor
              : getColors(theme, Colors.progressBarBackground)
          }
          maximumTrackTintColor={
            maximumTrackTintColor ? maximumTrackTintColor : '#d3d3d3'
          }
          thumbTintColor={getColors(theme, Colors.progressBarBackground)}
          value={progress.position}
          thumbStyle={{
            ...styles.progressThumb,
            ...progressThumbStyles,
          }}
          onValueChange={seekTo}
        />
        {durationBlock}
      </View>
    );
  },
);
