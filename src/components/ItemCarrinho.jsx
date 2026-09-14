import { calcularSubtotal, formatarMoeda } from '../utils/pagamento'

/**
 * Componente reutilizavel que exibe um produto do carrinho.
 * Recebe o produto por props e nao guarda estado proprio (RF12).
 */
function ItemCarrinho({ produto }) {
  const subtotal = calcularSubtotal(produto)

  return (
    <li className="item-carrinho">
      <div className="item-carrinho__identificacao">
        <h3 className="item-carrinho__nome">{produto.nome}</h3>
        <p className="item-carrinho__detalhe">
          {formatarMoeda(produto.preco)} <span aria-hidden="true">x</span>
          <span className="sr-only"> vezes </span>
          {produto.quantidade}
        </p>
      </div>

      <p className="item-carrinho__subtotal">
        <span className="sr-only">Subtotal do item: </span>
        {formatarMoeda(subtotal)}
      </p>
    </li>
  )
}

export default ItemCarrinho
