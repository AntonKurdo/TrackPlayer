import React, {useContext, useEffect, useRef} from 'react';
import {
  Animated,
  ColorSchemeName,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {BottomControls} from '../components/bottom-controls';

// SCREENS
import {Main} from '../screens/main';
import {Favourites} from '../screens/favourites';
import {Profile} from '../screens/profile';
import {SkiaPixelatedImage} from '../screens/skia-pixelated-image';

import {routes} from './routes';
import {Icon, IconType} from '../components/icon';
import {appObserver} from '../state-management/utils';
import {favouritesListState} from '../state-management';
import {ThemeContext} from '../context/theme-context/theme-context';
import {ThemeContextType} from '../context/theme-context/theme-context.types';

import {Colors, getColors} from '../style/colors';

const BOTTOM_BAR_HEIGHT = 120;
const BOTTOM_BAR_ANIMATION_DURATION = 300;

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
  {
    index: 3,
    name: routes.skia,
    iconProps: {
      type: IconType.MaterialCommunity,
      activeIconName: 'file-image',
      inactiveIconName: 'file-image-outline',
    },
    component: SkiaPixelatedImage,
  },
];

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;

  return (
    <Tab.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <TabBar theme={theme} {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      {controls.map(c => {
        return (
          <Tab.Screen key={c.index} name={c.name} component={c.component} />
        );
      })}
    </Tab.Navigator>
  );
};

type BottomTabBarVisibleProps = {
  tabBarVisible: boolean;
};

const TabBar = ({
  state,
  navigation,
  theme,
  descriptors,
}: BottomTabBarProps & {theme: ColorSchemeName}) => {
  const focusedOptions = descriptors[state.routes[state.index].key]
    .options as BottomTabNavigationOptions & BottomTabBarVisibleProps;

  const animHeight = useRef(new Animated.Value(BOTTOM_BAR_HEIGHT)).current;

  useEffect(() => {
    if (!focusedOptions.hasOwnProperty('tabBarVisible')) {
      return;
    }

    if (focusedOptions?.tabBarVisible) {
      Animated.timing(animHeight, {
        toValue: BOTTOM_BAR_HEIGHT,
        duration: BOTTOM_BAR_ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animHeight, {
        toValue: 0,
        duration: BOTTOM_BAR_ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedOptions]);

  const onPressHandler = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <Animated.View
      style={{
        height: animHeight,
      }}>
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
    </Animated.View>
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
