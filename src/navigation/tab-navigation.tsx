import React, {useContext} from 'react';
import {
  ColorSchemeName,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {BottomControls} from '../components/bottom-controls';

import {Main} from '../screens/main';
import {Favourites} from '../screens/favourites';
import {Profile} from '../screens/profile';
import {Icon, IconType} from '../components/icon';
import {routes} from './routes';
import {appObserver} from '../state-management/utils';
import {favouritesListState} from '../state-management';
import {ThemeContext} from '../context/theme-context/theme-context';
import {ThemeContextType} from '../context/theme-context/theme-context.types';

import {Colors, getColors} from '../style/colors';

type ControlType = {
  index: number;
  name: string;
  iconProps: {
    type: keyof typeof IconType;
    activeIconName: string;
    inactiveIconName: string;
  };
  withFavouritesBadge?: boolean;
  component: any;
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
    component: Main,
  },
  {
    index: 1,
    name: routes.favourite,
    iconProps: {
      type: IconType.Material,
      activeIconName: 'favorite',
      inactiveIconName: 'favorite-outline',
    },
    withFavouritesBadge: true,
    component: Favourites,
  },

  {
    index: 2,
    name: routes.profile,
    iconProps: {
      type: IconType.FontAwesome,
      activeIconName: 'user-circle',
      inactiveIconName: 'user-circle-o',
    },
    component: Profile,
  },
];

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;

  return (
    <Tab.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <TabBar theme={theme} {...props} />}
      screenOptions={{headerShown: false}}>
      {controls.map(c => {
        return (
          <Tab.Screen key={c.index} name={c.name} component={c.component} />
        );
      })}
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

const TabBarControl = appObserver(
  ({
    c,
    isActive,
    onPress,
  }: {
    c: ControlType;
    isActive: boolean;
    onPress: () => void;
  }) => {
    const {theme} = useContext(ThemeContext) as ThemeContextType;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.controlWrapper}>
        <View>
          {c.withFavouritesBadge && Boolean(favouritesListState.list.length) && (
            <View style={styles.badgeWrapper}>
              <Text
                style={[
                  styles.badgeLabel,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    fontSize: favouritesListState.list.length > 1 ? 10 : 12,
                  },
                ]}>
                {favouritesListState.list.length}
              </Text>
            </View>
          )}
          <Icon
            size={25}
            type={c.iconProps.type}
            name={
              isActive
                ? c.iconProps.activeIconName
                : c.iconProps.inactiveIconName
            }
            color={
              isActive
                ? getColors(theme, Colors.yellow)
                : getColors(theme, Colors.bottomControlsLabel)
            }
          />
        </View>
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
  },
);

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
  badgeWrapper: {
    position: 'absolute',
    top: -8,
    right: -12,
    backgroundColor: '#d80000',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeLabel: {
    fontSize: 12,
    letterSpacing: -1,
    color: 'white',
    fontWeight: 'bold',
  },
});
