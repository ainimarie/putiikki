import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    cssVariables: true,
    palette: {
        background: {
            default: grey.A100, //'#F9F8F8',
        },
        primary: {
            main: '#AA6DA3',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: [
            'raleway'
        ].join(','),
    },
});

export default theme;