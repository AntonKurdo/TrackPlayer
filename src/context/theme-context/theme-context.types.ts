import {ColorSchemeName} from 'react-native';

export type ThemeContextType = {
  theme: ColorSchemeName | null;
  updateTheme: () => void;
};
