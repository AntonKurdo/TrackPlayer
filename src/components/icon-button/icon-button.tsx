import React, {FC} from 'react';
import {
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  useColorScheme,
} from 'react-native';

import {Colors, getColors} from '../../style/colors';

import {styles} from './icon-button.styles';

type IconButtonProps = {
  icon: React.ReactNode;
  onPress: () => void;
  isSelected?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  onPress,
  isSelected,
  containerStyle,
  disabled,
}) => {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        containerStyle,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: isSelected
            ? getColors(theme, Colors.yellow)
            : 'transparent',
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};
