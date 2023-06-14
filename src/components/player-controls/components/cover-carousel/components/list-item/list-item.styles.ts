import {Dimensions, StyleSheet} from 'react-native';

export const CAROUSEL_ITEM_WIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  coverWrapper: {
    width: CAROUSEL_ITEM_WIDTH,
    alignItems: 'center',
    borderRadius: 8,
  },
  innerWrapper: {
    width: CAROUSEL_ITEM_WIDTH * 0.57,
    height: CAROUSEL_ITEM_WIDTH * 0.57,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.37,
    shadowRadius: 8,
    elevation: 12,
  },
  cover: {
    flex: 1,
    borderRadius: 8,
  },
});
