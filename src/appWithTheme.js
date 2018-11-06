import React from 'react';
import AppRouter from './routers/AppRouter';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {purple} from '@material-ui/core/colors';

import './assets/scss/app.scss';
 
/*
  *@assign new Primary color to Material-ui purple
  *@first U need to import that color
  *@AMAZINGLLY U can also add your own rules in the theme object;
*/
const theme = createMuiTheme({
    palette: {
        type: 'light', //or 'dark'
        primary: purple,
        secondary: {
            main: '#f44336',
        },
        typography: {
            useNextVariants: true,
            suppressDeprecationWarnings: true,
        }
    },
    typography:{
        fontWeightSuperLight:200,
    }
});
const ThemedApp = () => ( 
    <MuiThemeProvider theme={theme}>
        <AppRouter />
    </MuiThemeProvider>
);

export default ThemedApp;
