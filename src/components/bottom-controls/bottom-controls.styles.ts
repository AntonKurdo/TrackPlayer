import {Dimensions, StyleSheet} from 'react-native';

const bottomControlsHeight = 80;

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: bottomControlsHeight,
    paddingTop: 6,
  },
  wrapper: {
    paddingHorizontal: 8,
    width: '100%',
    height: bottomControlsHeight / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerWrapper: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    maxWidth: Dimensions.get('screen').width * 0.65,
  },
  artist: {
    fontSize: 11,
    maxWidth: Dimensions.get('screen').width * 0.65,
  },
  cover: {
    width: 37,
    height: 37,
    borderRadius: 4,
    borderWidth: 1,
  },
  buttonWrapper: {paddingLeft: 0, marginRight: 8},
  progressContainer: {
    height: 0,
    position: 'absolute',
    top: -9,
    zIndex: 1,
  },
  sliderStyles: {width: Dimensions.get('window').width, height: 0},
  progressThumbStyles: {width: 0, height: 0},
  animationWrapper: {
    width: Dimensions.get('screen').width * 0.65,
    overflow: 'hidden',
  },
});