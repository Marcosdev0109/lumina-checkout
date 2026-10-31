import { Outlet } from 'react-router-dom'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

/**
 * Template aplicado a todas as paginas por meio de uma rota de layout.
 * O Outlet e o lugar onde o React Router desenha a pagina da rota atual.
 */
function Layout() {
  return (
    <div className="app">
      <a className="pular-conteudo" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <Outlet />

      <Footer />
    </div>
  )
}

export default Layout
