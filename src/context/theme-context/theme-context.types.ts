import {ColorSchemeName} from 'react-native';

export type ThemeContextType = {
  theme: ColorSchemeName | null;
  toggleTheme: (params: {x: number; y: number}) => void;
  isThemeAnimationActive: boolean;
};
