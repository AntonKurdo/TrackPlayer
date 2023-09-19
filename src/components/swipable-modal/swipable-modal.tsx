import React, {FC, useContext} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import {Colors, getColors} from '../../style/colors';
import {appObserver} from '../../state-management/utils';
import {ThemeContext} from '../../context/theme-context/theme-context';
import {ThemeContextType} from '../../context/theme-context/theme-context.types';

import {styles} from './swipable-modal.styles';

type Props = {
  isVisible: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  propagateSwipe?: boolean;
  useNativeDriverForBackdrop?: boolean;
};

export const SwipableModal: FC<Props> = appObserver(
  ({
    isVisible,
    closeModal,
    propagateSwipe,
    useNativeDriverForBackdrop,
    children,
  }) => {
    const {theme} = useContext(ThemeContext) as ThemeContextType;

    return (
      <Modal
        propagateSwipe={propagateSwipe}
        backdropColor={getColors(theme, Colors.label)}
        style={styles.container}
        isVisible={isVisible}
        swipeThreshold={200}
        onSwipeComplete={closeModal}
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}
        useNativeDriverForBackdrop={useNativeDriverForBackdrop}
        hideModalContentWhileAnimating={true}
        swipeDirection="down">
        <View style={[styles.wrapper]}>{children}</View>
      </Modal>
    );
  },
);
