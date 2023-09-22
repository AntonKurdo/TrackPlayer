import React, {FC} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import {withTheme} from '../../hocs/with-theme';
import {Colors, getColors} from '../../style/colors';
import {appObserver} from '../../state-management/utils';

import {styles} from './swipable-modal.styles';

type Props = {
  isVisible: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  propagateSwipe?: boolean;
  useNativeDriverForBackdrop?: boolean;
};

export const SwipableModal: FC<Props> = appObserver(
  withTheme(
    ({
      theme,
      isVisible,
      closeModal,
      propagateSwipe,
      useNativeDriverForBackdrop,
      children,
    }) => {
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
  ),
);
