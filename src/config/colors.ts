export const Colors = {
  light: {
    PRIMARY: '#ffc800',
    BACKGROUND: '#ffffff',
    TEXT_PRIMARY: '#000000',
    TEXT_SECONDARY: '#333333',
    BORDER: '#dddddd'
  },
  dark: {
    PRIMARY: '#ffc800',
    BACKGROUND: '#1a1a1a',
    TEXT_PRIMARY: '#ffffff',
    TEXT_SECONDARY: '#cccccc',
    BORDER: '#444444'
  }
} as const;

export type ThemeMode = keyof typeof Colors;
export type ThemeColors = typeof Colors.light;
