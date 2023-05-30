import React, {FC} from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export enum IconType {
  AntDesign = 'AntDesign',
  Ionicons = 'Ionicons',
  Material = 'Material',
  SimpleLine = 'SimpleLine',
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

  if (type === IconType.Material) {
    return <MaterialIcon name={name} size={size} color={color} />;
  }

  if (type === IconType.SimpleLine) {
    return <SimpleLineIcons name={name} size={size} color={color} />;
  }

  return null;
};
