import React, {useContext} from 'react';

import {ThemeContext} from '../context/theme-context/theme-context';
import {ThemeContextType} from '../context/theme-context/theme-context.types';

export function withTheme<P>(
  WrappedComponent: React.ComponentType<P & ThemeContextType>,
) {
  return (props: P) => {
    const themeProps = useContext(ThemeContext) as ThemeContextType;

    return <WrappedComponent {...themeProps} {...props} />;
  };
}
