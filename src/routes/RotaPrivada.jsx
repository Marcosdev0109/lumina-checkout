import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useCarrinho } from '../hooks/useCarrinho'

/**
 * Rota privada (RF12): so deixa abrir a pagina se houver itens no carrinho.
 * Caso contrario, redireciona para /carrinho.
 */
function RotaPrivada({ children }) {
  const { quantidadeTotal } = useCarrinho()

  if (quantidadeTotal === 0) {
    return <Navigate to="/carrinho" replace />
  }

  return children
}

RotaPrivada.propTypes = {
  children: PropTypes.node.isRequired
}

export default RotaPrivada
