import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/templates/Layout'
import Produtos from './pages/Produtos'
import Carrinho from './pages/Carrinho'
import Pagamento from './pages/Pagamento'
import Sucesso from './pages/Sucesso'
import Falha from './pages/Falha'
import NaoEncontrada from './pages/NaoEncontrada'

/**
 * Mapa de rotas da loja (RF14).
 * Todas as paginas ficam dentro da rota de layout, que desenha Header e Footer.
 */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/produtos" replace />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="carrinho" element={<Carrinho />} />
        <Route path="pagamento" element={<Pagamento />} />
        <Route path="sucesso" element={<Sucesso />} />
        <Route path="falha" element={<Falha />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
