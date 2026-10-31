import { createTheme } from '@mui/material/styles'

/**
 * Tema do Material UI com as mesmas cores das variaveis CSS da loja,
 * para que os componentes do MUI e os CSS Modules tenham a mesma identidade.
 */
export const tema = createTheme({
  palette: {
    primary: { main: '#5b3df5', dark: '#4227d6', contrastText: '#ffffff' },
    secondary: { main: '#f5c344', contrastText: '#191826' },
    error: { main: '#c02717' },
    success: { main: '#128054' },
    text: { primary: '#191826', secondary: '#63607a' }
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
    button: { textTransform: 'none', fontWeight: 700, fontSize: '1rem' }
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 48 } }
    }
  }
})
