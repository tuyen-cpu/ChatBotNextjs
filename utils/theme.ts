import { createTheme, PaletteOptions } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles/createTheme'


const darkTheme: PaletteOptions = {
  // divider: 'rgba(60,65,71,0.8)',

  primary: {
    main: '#56b3de',
  },
  background: {
    paper: '#222222',
    // default: 'rgb(25, 30, 36,1)',
    default:'rgba(34,34,34,0.99)',
    google: '#4285F4',
  },
  text: {
    //  primary: '#ffffff',
    // secondary:'#fff'
    custom:'#fff'
  },
  action: {
    // disabledBackground: '#56b3de',
    // disabled: '#fff',
  },
}
const lightTheme = {
  // divider: '#3c4147',
  background: {
    paper: '#fff',
    default: '#f4fafd',
    // secondary: '#13161b',
    // input: '#1c1f24',
    google: '#4285F4',
  },
  text: {
    // primary: '#ffffff',
    // secondary:'#fff'
    custom:'#fff'
  },
  action: {
    // disabledBackground: '#0082c9',
    // disabled: '#fff',
    hover:'green'
  },
}

export const themeDesign = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light') ? lightTheme : darkTheme,
  },

  typography: {
    // fontSize:30,
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(60,65,71,0.7)',
          },
          '&.MuiTextField-root .MuiInputBase-root': {
            // backgroundColor: '#1c1f24', // Ghi đè màu nền cho TextField
          },
          '& .MuiFormHelperText-root.Mui-error': { //<--- here
            color: 'rgb(235, 88, 87,1)',
            marginTop:0,
          },
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontSize: 30,
          },
        },
      ],
    },
    MuiOutlinedInput: {
    },
  },
})
