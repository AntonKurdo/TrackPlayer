import {StyleSheet} from 'react-native';

export const HEADER_HEIGHT = 50;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEADER_HEIGHT,

    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    position: 'absolute',
    right: 20,
  },
});
