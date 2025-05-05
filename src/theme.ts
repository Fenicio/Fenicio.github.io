import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  } as ThemeConfig,
  colors: {
    brand: {
      50: '#f0f4ff',
      100: '#d9e4ff',
      200: '#a6c1ff',
      300: '#739dff',
      400: '#407aff',
      500: '#0d57ff',
      600: '#0046cc',
      700: '#003499',
      800: '#002366',
      900: '#001133',
    },

  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: undefined,
      },
    }),
  },
});


export default theme;
