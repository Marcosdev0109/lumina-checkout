import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CarrinhoProvider } from './contexts/CarrinhoContext'
import './assets/styles/index.css'

// Ponto de entrada da aplicacao.
// BrowserRouter libera as rotas e o CarrinhoProvider envolve todas elas,
// para que qualquer pagina consiga ler e alterar o carrinho.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CarrinhoProvider>
        <App />
      </CarrinhoProvider>
    </BrowserRouter>
  </React.StrictMode>
)
