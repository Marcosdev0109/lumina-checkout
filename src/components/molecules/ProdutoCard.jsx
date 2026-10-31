import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ImagemProduto from '../atoms/ImagemProduto'
import Preco from '../atoms/Preco'
import estilos from './ProdutoCard.module.css'

/**
 * Card de um produto do catalogo (RF03).
 * Recebe tudo por props e nao guarda estado proprio.
 */
function ProdutoCard({ produto, onAdicionar, podeAdicionar = true }) {
  const linkDetalhe = `/produtos/${produto.id}`

  return (
    <article className={estilos.card} aria-labelledby={`produto-${produto.id}`}>
      <ImagemProduto className={estilos.imagem} src={produto.imagem} alt={produto.nome} />

      <div className={estilos.corpo}>
        <p className={estilos.categoria}>{produto.categoria}</p>

        <h2 className={estilos.nome} id={`produto-${produto.id}`}>
          <Link to={linkDetalhe}>{produto.nome}</Link>
        </h2>

        <Preco className={estilos.preco} valor={produto.preco} />

        <div className={estilos.acoes}>
          <button
            className="botao botao--primario"
            type="button"
            onClick={() => onAdicionar?.(produto)}
            disabled={!podeAdicionar}
          >
            {podeAdicionar ? 'Adicionar ao carrinho' : 'Limite de estoque atingido'}
          </button>

          <Link className="botao botao--secundario" to={linkDetalhe}>
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  )
}

ProdutoCard.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string.isRequired
  }).isRequired,
  onAdicionar: PropTypes.func,
  podeAdicionar: PropTypes.bool
}

export default ProdutoCard
