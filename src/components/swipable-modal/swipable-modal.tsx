import React, {FC} from 'react';
import {View, useColorScheme} from 'react-native';
import Modal from 'react-native-modal';

import {Colors, getColors} from '../../style/colors';

import {styles} from './swipable-modal.styles';

type Props = {
  isVisible: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export const SwipableModal: FC<Props> = ({isVisible, closeModal, children}) => {
  const theme = useColorScheme();

  return (
    <Modal
      backdropColor={getColors(theme, Colors.label)}
      style={styles.container}
      isVisible={isVisible}
      swipeThreshold={200}
      onSwipeComplete={closeModal}
      hideModalContentWhileAnimating={true}
      swipeDirection="down">
      <View style={[styles.wrapper]}>{children}</View>
    </Modal>
  );
};
