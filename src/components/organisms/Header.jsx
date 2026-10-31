import { Link, NavLink } from 'react-router-dom'
import Logo from '../atoms/Logo'
import estilos from './Header.module.css'

/** Classe do NavLink: destaca o link da pagina atual. */
function classeDoLink({ isActive }) {
  return isActive ? `${estilos.link} ${estilos.ativo}` : estilos.link
}

/** Cabecalho fixo da loja, presente em todas as paginas pelo Layout. */
function Header() {
  return (
    <header className={estilos.header}>
      <div className={estilos.conteudo}>
        <Link className={estilos.marca} to="/produtos">
          <Logo />
          <span>Lumina Store</span>
        </Link>

        <nav className={estilos.navegacao} aria-label="Principal">
          <ul>
            <li>
              <NavLink className={classeDoLink} to="/produtos" end>
                Produtos
              </NavLink>
            </li>
            <li>
              <NavLink className={classeDoLink} to="/carrinho">
                Carrinho
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
