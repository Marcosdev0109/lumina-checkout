import PropTypes from 'prop-types'
import ProdutoCard from '../molecules/ProdutoCard'
import estilos from './ListaProdutos.module.css'

/** Grade de produtos. A key usa o id, que e estavel e unico. */
function ListaProdutos({ produtos, onAdicionar, podeAdicionar }) {
  return (
    <ul className={estilos.grade}>
      {produtos.map((produto) => (
        <li key={produto.id}>
          <ProdutoCard
            produto={produto}
            onAdicionar={onAdicionar}
            podeAdicionar={podeAdicionar ? podeAdicionar(produto) : true}
          />
        </li>
      ))}
    </ul>
  )
}

ListaProdutos.propTypes = {
  produtos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdicionar: PropTypes.func,
  podeAdicionar: PropTypes.func
}

export default ListaProdutos
