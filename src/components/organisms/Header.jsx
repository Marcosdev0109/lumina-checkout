import { Link, NavLink } from 'react-router-dom'
import Badge from '@mui/material/Badge'
import Logo from '../atoms/Logo'
import { useCarrinho } from '../../hooks/useCarrinho'
import estilos from './Header.module.css'

/** Classe do NavLink: destaca o link da pagina atual. */
function classeDoLink({ isActive }) {
  return isActive ? `${estilos.link} ${estilos.ativo}` : estilos.link
}

/** Icone de sacola desenhado em SVG. */
function IconeCarrinho() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path
        d="M6 7h12l-1 13H7L6 7zm3 0a3 3 0 0 1 6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Cabecalho fixo da loja, presente em todas as paginas pelo Layout. */
function Header() {
  const { quantidadeTotal } = useCarrinho()
  const rotuloCarrinho = `Carrinho, ${quantidadeTotal} ${quantidadeTotal === 1 ? 'item' : 'itens'}`

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
              <NavLink className={classeDoLink} to="/carrinho" aria-label={rotuloCarrinho}>
                {/* Badge do Material UI com a quantidade total de itens (RF09). */}
                <Badge
                  badgeContent={quantidadeTotal}
                  showZero
                  max={99}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: 'var(--cor-destaque)',
                      color: 'var(--cor-texto)',
                      fontWeight: 700
                    }
                  }}
                >
                  <IconeCarrinho />
                </Badge>
                <span className={estilos.textoCarrinho}>Carrinho</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
