import PropTypes from 'prop-types'
import { formatarMoeda } from '../../utils/moeda'

/** Exibe um valor formatado em reais. */
function Preco({ valor, className }) {
  return <span className={className}>{formatarMoeda(valor)}</span>
}

Preco.propTypes = {
  valor: PropTypes.number.isRequired,
  className: PropTypes.string
}

export default Preco
