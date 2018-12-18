import React from 'react';
import { render } from 'react-dom';
import Root from './scripts/containers/Root';
import { Provider } from 'react-redux';

/* Material-UI componnents */
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    useNextVariants: true,
  },
});

import configureStore from './scripts/store/state';

require('./styles/main.scss');

render(
  (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={configureStore()}>
        <Root />
      </Provider>
    </MuiThemeProvider>
  ),
  document.getElementById('root')
);
