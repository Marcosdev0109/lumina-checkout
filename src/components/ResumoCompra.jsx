import { formatarMoeda } from '../utils/pagamento'

/**
 * Componente reutilizavel com o resumo de valores da compra (RF12).
 * Usado tanto na tela do carrinho quanto na tela de pagamento,
 * garantindo que o total exibido seja sempre o mesmo (RF04).
 */
function ResumoCompra({ quantidadeItens, total, titulo = 'Resumo da compra' }) {
  return (
    <section className="resumo" aria-labelledby="resumo-titulo">
      <h2 id="resumo-titulo" className="resumo__titulo">
        {titulo}
      </h2>

      <dl className="resumo__lista">
        <div className="resumo__linha">
          <dt>Itens</dt>
          <dd>{quantidadeItens}</dd>
        </div>

        <div className="resumo__linha resumo__linha--total">
          <dt>Total</dt>
          <dd>{formatarMoeda(total)}</dd>
        </div>
      </dl>
    </section>
  )
}

export default ResumoCompra
