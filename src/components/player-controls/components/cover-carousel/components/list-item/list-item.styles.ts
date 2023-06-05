import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  coverWrapper: {
    width: Dimensions.get('screen').width - 40,
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  innerWrapper: {
    width: 250,
    height: 250,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cover: {
    flex: 1,
  },
});
