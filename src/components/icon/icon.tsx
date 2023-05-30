import React, {FC} from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

export enum IconType {
  AntDesign = 'AntDesign',
  Ionicons = 'Ionicons',
}

type IconProps = {
  name: string;
  size: number;
  color: any;
  type?: keyof typeof IconType;
};

export const Icon: FC<IconProps> = ({
  name,
  size,
  color,
  type = IconType.AntDesign,
}) => {
  if (type === IconType.AntDesign) {
    return <AntDesignIcon name={name} size={size} color={color} />;
  }

  if (type === IconType.Ionicons) {
    return <IoniconsIcon name={name} size={size} color={color} />;
  }

  return null;
};
