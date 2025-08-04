import { DefaultTheme } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

export const ACTIVE_OPACITY = 0.7;

export const spacing = {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
}


export const theme : ThemeProp = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#14AE5C',
        onBackground: '#010101',
        onSurface: '#010101',
        outline: '#5E5E5E',
        background: '#FFFFFF',
        error: '#f44336',
        outlineVariant: '#eee',
        secondary: '#595959',
        surfaceVariant: '#F4F4F4',
        surface: '#FFFFFF',
        backdrop: 'rgba(0,0,0,0.9)',
        secondaryContainer: '#f4f4f4',
    },
};

export type Colors = typeof theme.colors;