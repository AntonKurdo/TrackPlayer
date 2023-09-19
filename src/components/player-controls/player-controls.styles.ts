import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  title: {
    fontSize: 17,
    letterSpacing: 1.5,
  },
  artist: {
    fontSize: 12,
  },
  controlWrapper: {
    justifyContent: 'center',
    width: '100%',
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
  likeButton: {
    position: 'absolute',
    right: 0,
  },
  innerWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  paddingWrapper: {paddingHorizontal: 20, marginVertical: 8},
});
