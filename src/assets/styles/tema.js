import { createTheme } from '@mui/material/styles'

/**
 * Tema do Material UI com as mesmas cores das variaveis CSS da loja,
 * para que os componentes do MUI e os CSS Modules tenham a mesma identidade.
 */
export const tema = createTheme({
  palette: {
    primary: { main: '#1c1917', dark: '#000000', light: '#3a332d', contrastText: '#ffffff' },
    secondary: { main: '#d6a04a', contrastText: '#1c1917' },
    error: { main: '#b42318' },
    success: { main: '#127a4f' },
    text: { primary: '#1c1917', secondary: '#6b6359' }
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
    button: { textTransform: 'none', fontWeight: 700, fontSize: '1rem' }
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 48 } }
    }
  }
})
