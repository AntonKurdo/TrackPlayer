import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  coverWrapper: {
    paddingVertical: 8,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    marginBottom: 16,
  },
  cover: {
    borderRadius: 8,
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 17,
    letterSpacing: 1.5,
  },
  artist: {
    fontSize: 12,
  },
  controlWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  repeatButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
