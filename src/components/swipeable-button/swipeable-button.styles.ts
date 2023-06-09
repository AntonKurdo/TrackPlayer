import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  renderRightActionWrapper: {
    overflow: 'hidden',
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 4,
    marginVertical: 1,
  },
  renderRightActionLabel: {fontWeight: 'bold', color: 'white'},
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
