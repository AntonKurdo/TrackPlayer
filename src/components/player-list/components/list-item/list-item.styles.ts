import {Dimensions, StyleSheet} from 'react-native';
import {TRACK_HEIGHT} from '../../player';

const WIDTH = Dimensions.get('screen').width * 0.75;

export const styles = StyleSheet.create({
  wrapper: {
    height: TRACK_HEIGHT,
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: 'row',
  },
  cover: {width: 50, height: 50, borderRadius: 4},
  nameWrapper: {
    marginLeft: 8,
  },
  title: {
    maxWidth: WIDTH,
    fontSize: 17,
    fontWeight: '600',
  },
  artist: {
    maxWidth: WIDTH,
    fontSize: 14,
  },
  coverInnerWrapper: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 10,
  },
});
