import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  } as ThemeConfig,
  colors: {
    // Shared semantic tokens
    ink: {
      light: '#2e2e2e',   // Deep charcoal (light mode text)
      dark: '#d1bfa3',    // Warm parchment (dark mode text)
    },
    background: {
      light: '#f9f6ef',   // Aged parchment
      dark: '#0a0a0a',    // Deep black
    },
    surface: {
      light: '#f1eee7',   // Fresco/paper tone
      dark: '#1a1a1a',    // Slightly raised section bg
    },
    highlight: '#c0a060', // Aged gold
    accent: '#5e4b3c',    // Burnt umber
    danger: '#8e3b3b',    // Deep red
    gray: {
      50: '#fcfbf9',
      100: '#f9f6ef',
      200: '#f1eee7',
      300: '#d1bfa3',
      600: '#6a6a6a',
      700: '#3f3f3f',
      800: '#2e2e2e',
      900: '#0a0a0a',
    },
  },
  fonts: {
    heading: `'EB Garamond Variable', serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'background.dark' : 'background.light',
        color: props.colorMode === 'dark' ? 'ink.dark' : 'ink.light',
      },
    }),
  },
});

export default theme;