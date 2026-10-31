import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import App from './App'
import { CarrinhoProvider } from './contexts/CarrinhoContext'
import { tema } from './assets/styles/tema'
import './assets/styles/index.css'

// Ponto de entrada da aplicacao.
// ThemeProvider aplica o tema do Material UI, BrowserRouter libera as rotas e o CarrinhoProvider envolve todas elas,
// para que qualquer pagina consiga ler e alterar o carrinho.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={tema}>
      <BrowserRouter>
        <CarrinhoProvider>
          <App />
        </CarrinhoProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
