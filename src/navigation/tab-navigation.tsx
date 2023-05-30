import React from 'react';
import {
  ColorSchemeName,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {BottomControls} from '../components/bottom-controls';

import {Main} from '../screens/main';
import {Favourites} from '../screens/favourites';
import {Icon, IconType} from '../components/icon';
import {routes} from './routes';

import {Colors, getColors} from '../style/colors';

type ControlType = {
  index: number;
  name: string;
  iconProps: {
    type: IconType;
    activeIconName: string;
    inactiveIconName: string;
  };
};

const controls: ControlType[] = [
  {
    index: 0,
    name: routes.main,
    iconProps: {
      type: IconType.SimpleLine,
      activeIconName: 'playlist',
      inactiveIconName: 'playlist',
    },
  },
  {
    index: 1,
    name: routes.favourite,
    iconProps: {
      type: IconType.Material,
      activeIconName: 'favorite',
      inactiveIconName: 'favorite-outline',
    },
  },
];

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  const theme = useColorScheme();

  return (
    <Tab.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <TabBar theme={theme} {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name={routes.main} component={Main} />
      <Tab.Screen name={routes.favourite} component={Favourites} />
    </Tab.Navigator>
  );
};

const TabBar = ({
  state,
  navigation,
  theme,
}: BottomTabBarProps & {theme: ColorSchemeName}) => {
  const onPressHandler = (route: string) => {
    navigation.navigate(route);
  };
  return (
    <>
      <BottomControls />
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: getColors(theme, Colors.bottomControlsBackground),
          },
        ]}>
        {controls.map(c => (
          <TabBarControl
            key={c.name}
            onPress={onPressHandler.bind(null, c.name)}
            isActive={state.index === c.index}
            c={c}
          />
        ))}
      </View>
    </>
  );
};

const TabBarControl = ({
  c,
  isActive,
  onPress,
}: {
  c: ControlType;
  isActive: boolean;
  onPress: () => void;
}) => {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.controlWrapper}>
      <Icon
        size={25}
        type={c.iconProps.type}
        name={
          isActive ? c.iconProps.activeIconName : c.iconProps.inactiveIconName
        }
        color={
          isActive
            ? getColors(theme, Colors.yellow)
            : getColors(theme, Colors.bottomControlsLabel)
        }
      />
      <Text
        style={[
          styles.label,
          {
            color: isActive
              ? getColors(theme, Colors.yellow)
              : getColors(theme, Colors.bottomControlsLabel),
          },
        ]}>
        {c.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 8,
    paddingHorizontal: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  controlWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 3,
  },
});
