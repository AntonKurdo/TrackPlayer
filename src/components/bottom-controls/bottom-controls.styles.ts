import {Dimensions, StyleSheet} from 'react-native';

const bottomControlsHeight = 50;

const WIDTH = Dimensions.get('screen').width * 0.65;

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: bottomControlsHeight,
    justifyContent: 'center',
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
    maxWidth: WIDTH,
  },
  artist: {
    fontSize: 11,
    maxWidth: WIDTH,
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
    top: 2,
    zIndex: 1,
  },
  sliderStyles: {width: Dimensions.get('window').width, height: 0},
  progressThumbStyles: {width: 0, height: 0},
  animationWrapper: {
    width: WIDTH,
    overflow: 'hidden',
  },
});
