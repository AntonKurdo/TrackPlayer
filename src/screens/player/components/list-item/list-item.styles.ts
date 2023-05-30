import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
  },
  cover: {width: 50, height: 50, borderRadius: 4},
  nameWrapper: {
    marginLeft: 8,
  },
  title: {
    maxWidth: Dimensions.get('screen').width * 0.75,
    fontSize: 17,
    fontWeight: '600',
  },
  artist: {
    maxWidth: Dimensions.get('screen').width * 0.75,
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
