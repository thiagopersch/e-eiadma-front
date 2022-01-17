import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';
import GlobalStyles from 'styles/global';

export const parameters = {
  backgrounds: {
    default: 'ieadma-light',
    values: [
      {
        name: 'ieadma-light',
        value: theme.colors.mainBg
      },
      {
        name: 'ieadma-white',
        value: theme.colors.white
      }
    ]
  }
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  )
];
