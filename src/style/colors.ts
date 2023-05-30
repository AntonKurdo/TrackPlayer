import {ColorSchemeName} from 'react-native/types';

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export enum Colors {
  yellow = 'yellow',
  background = 'background',
  label = 'label',
  button = 'button',
  progressBarBackground = 'progressBarBackground',
  progressBarBorder = 'progressBarBorder',
  bottomControlsBackground = 'bottomControlsBackground',
  bottomControlsLabel = 'bottomControlsLabel',
}

export const getColors = (theme: ColorSchemeName, color: Colors): any => {
  const ligthTheme = {
    yellow: '#FBE106',
    label: 'black',
    button: 'black',
    progressBarBackground: 'black',
    progressBarBorder: 'black',
    background: 'white',
    bottomControlsBackground: 'black',
    bottomControlsLabel: 'white',
  };

  const darkTheme = {
    yellow: '#FBE106',
    label: 'white',
    button: 'white',
    progressBarBackground: 'white',
    progressBarBorder: 'white',
    background: 'black',
    bottomControlsBackground: 'white',
    bottomControlsLabel: 'black',
  };

  return theme === Theme.light ? ligthTheme[color] : darkTheme[color];
};
