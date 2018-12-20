import React from 'react';
import AppRouter from './routers/AppRouter';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {purple, orange} from '@material-ui/core/colors';

import './assets/scss/app.scss';
 
/*
  *@assign new Primary color to Material-ui purple
  *@first U need to import that color
  *@AMAZINGLLY U can also add your own rules in the theme object;
*/

console.log('orange', orange);
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
const theme = createMuiTheme({
  palette: {
    type: 'light', //or 'dark'
    primary: purple,
    secondary: {
      main: orange[300],
    },
    /*typography: {
            useNextVariants: true,
        }*/ //window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; this works only
  },
  typography:{
    fontWeightSuperLight:200,
  }
});
const ThemedApp = () => ( 
  <MuiThemeProvider theme={theme}  style={{position:'relative'}}> 
    <AppRouter />
  </MuiThemeProvider>
);

export default ThemedApp;
