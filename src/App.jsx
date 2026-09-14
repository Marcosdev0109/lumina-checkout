import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Carrinho from './pages/Carrinho'
import Pagamento from './pages/Pagamento'
import Sucesso from './pages/Sucesso'
import Falha from './pages/Falha'

/**
 * Configuracao das quatro rotas da SPA (RF14):
 * /          -> carrinho
 * /pagamento -> formulario do cartao
 * /sucesso   -> compra aprovada
 * /falha     -> "tentativa de golpe"
 */
function App() {
  return (
    <div className="app">
      <a className="pular-conteudo" href="#conteudo">
        Pular para o conteudo
      </a>

      <header className="topo">
        <Link className="topo__marca" to="/">
          {/* Marca da loja desenhada em SVG inline, sem dependencia de arquivo externo. */}
          <svg
            className="topo__logo"
            viewBox="0 0 32 32"
            width="28"
            height="28"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="16" cy="13" r="8" fill="#f5c344" />
            <path d="M11 22h10v3a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-3z" fill="#3c3a52" />
            <path
              d="M16 2v2M26 13h2M4 13h2M23.8 5.2l1.4-1.4M6.8 3.8l1.4 1.4"
              stroke="#f5c344"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Lumina</span>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Carrinho />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/falha" element={<Falha />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="rodape">
        <p>Lumina Checkout - projeto academico. Pagamento simulado no navegador.</p>
      </footer>
    </div>
  )
}

export default App
