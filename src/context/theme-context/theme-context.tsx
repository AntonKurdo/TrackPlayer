import React, {useCallback, useRef, useState} from 'react';
import {
  Canvas,
  Circle,
  Image,
  ImageShader,
  SkImage,
  dist,
  makeImageFromView,
  mix,
  vec,
} from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  ColorSchemeName,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import {appObserver} from '../../state-management/utils';
import {wait} from '../../utils/system';
import {Storage} from '../../services/storage';
import {ThemeContextType} from './theme-context.types';

const {width, height} = Dimensions.get('screen');

const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<{children: React.ReactNode}> = appObserver(
  ({children}) => {
    const systemColorScheme = useColorScheme();

    const [theme, setTheme] = useState<ColorSchemeName>(
      (Storage.getString(Storage.storageKeys.theme) as ColorSchemeName) ||
        systemColorScheme,
    );

    const [isThemeAnimationActive, setAnimationActive] = useState(false);

    const transition = useSharedValue(0);
    const circle = useSharedValue({x: 0, y: 0, r: 0});

    const r = useDerivedValue(() => {
      return mix(transition.value, 0, circle.value.r);
    });

    const [overlay1, setOverlay1] = useState<SkImage | null>(null);
    const [overlay2, setOverlay2] = useState<SkImage | null>(null);

    const ref = useRef(null);

    const updateTheme = useCallback(() => {
      if (theme === 'dark') {
        setTheme('light');
        Storage.setString(Storage.storageKeys.theme, 'light');
      } else {
        setTheme('dark');
        Storage.setString(Storage.storageKeys.theme, 'dark');
      }
    }, [theme]);

    const toggleTheme = useCallback(
      async ({x, y}: {x: number; y: number}) => {
        if (Platform.OS === 'android') {
          updateTheme();
        }

        if (Platform.OS === 'ios') {
          setAnimationActive(true);
          circle.value = {
            x,
            y,
            r: Math.max(...corners.map(c => dist(c, vec(x, y)))),
          };
          setOverlay1(await makeImageFromView(ref));

          updateTheme();

          await wait(50);
          setOverlay2(await makeImageFromView(ref));

          const duration = 650;
          transition.value = 0;
          transition.value = withTiming(1, {duration});
          await wait(duration);
          setOverlay1(null);
          setOverlay2(null);
          setAnimationActive(false);
        }
      },
      [circle, transition, updateTheme],
    );

    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <View ref={ref} style={{flex: 1}}>
          <ThemeContext.Provider
            value={{theme, toggleTheme, isThemeAnimationActive}}>
            {children}
          </ThemeContext.Provider>
        </View>
        {overlay1 && (
          <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
            <Image image={overlay1} x={0} y={0} width={width} height={height} />
            {overlay2 && (
              <Circle c={circle} r={r}>
                <ImageShader
                  image={overlay2}
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                  fit={'cover'}
                />
              </Circle>
            )}
          </Canvas>
        )}
      </View>
    );
  },
);

export default ThemeProvider;
