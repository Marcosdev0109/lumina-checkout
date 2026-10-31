import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ImagemProduto from '../atoms/ImagemProduto'
import SeletorQuantidade from './SeletorQuantidade'
import { calcularSubtotal } from '../../utils/carrinho'
import { formatarMoeda } from '../../utils/moeda'
import estilos from './ItemCarrinho.module.css'

/**
 * Um item da pagina do carrinho (RF08).
 * Recebe o item e as acoes por props; quem guarda o estado e o CarrinhoContext.
 */
function ItemCarrinho({ item, onAlterarQuantidade, onRemover }) {
  const subtotal = calcularSubtotal(item)

  return (
    <li className={estilos.item}>
      <ImagemProduto className={estilos.imagem} src={item.imagem} alt={item.nome} />

      <div className={estilos.identificacao}>
        <h3 className={estilos.nome}>
          <Link to={`/produtos/${item.id}`}>{item.nome}</Link>
        </h3>
        <p className={estilos.precoUnitario}>{formatarMoeda(item.preco)} cada</p>
        <p className={estilos.estoque}>Estoque: {item.estoque}</p>
      </div>

      <div className={estilos.controles}>
        <SeletorQuantidade
          quantidade={item.quantidade}
          maximo={item.estoque}
          nomeProduto={item.nome}
          onAlterar={(quantidade) => onAlterarQuantidade(item.id, quantidade)}
        />

        <p className={estilos.subtotal}>
          <span className="sr-only">Subtotal do item: </span>
          {formatarMoeda(subtotal)}
        </p>

        <button
          className={estilos.remover}
          type="button"
          onClick={() => onRemover(item.id)}
          aria-label={`Remover ${item.nome} do carrinho`}
        >
          Remover
        </button>
      </div>
    </li>
  )
}

ItemCarrinho.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    quantidade: PropTypes.number.isRequired,
    estoque: PropTypes.number.isRequired,
    imagem: PropTypes.string.isRequired
  }).isRequired,
  onAlterarQuantidade: PropTypes.func.isRequired,
  onRemover: PropTypes.func.isRequired
}

export default ItemCarrinho
