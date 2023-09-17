import React, {useState} from 'react';

import {ThemeContextType} from './theme-context.types';

import {ColorSchemeName} from 'react-native';
import {appObserver} from '../../state-management/utils';

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<{children: React.ReactNode}> = appObserver(
  ({children}) => {
    const [theme, setTheme] = useState<ColorSchemeName>('dark');

    const updateTheme = () => {
      if (theme === 'dark') {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    };

    return (
      <ThemeContext.Provider value={{theme, updateTheme}}>
        {children}
      </ThemeContext.Provider>
    );
  },
);

export default ThemeProvider;
