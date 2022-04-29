import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { UserProvider } from './providers/UserProvider';

import App from './App';
import theme from './theme';
import { Button } from '@mui/material';

const container = document.querySelector('#root');
const root = createRoot(container);

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={4}
      action={(key) => <Button onClick={onClickDismiss(key)}>Limpar</Button>}>
      <UserProvider>
        <App />
      </UserProvider>
    </SnackbarProvider>
  </ThemeProvider>
);
