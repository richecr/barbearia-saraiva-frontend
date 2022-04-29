import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#dc851f'
    },
    secondary: {
      main: '#dc851f'
    }
  },
  typography: {
    fontFamily: 'Roboto Slab',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    h1: {
      fontSize: 36,
      fontWeight: 500
    },
    h2: {
      fontSize: 24,
      fontWeight: 500
    },
    h3: {
      fontSize: 20
    },
    h4: {
      fontSize: 16,
      fontWeight: 400
    },
    subtitle1: {
      fontSize: 20,
      fontWeight: 500
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400
    },
    button: {
      fontSize: 16
    }
  }
});

export default theme;
