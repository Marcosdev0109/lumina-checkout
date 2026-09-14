import { Link } from 'react-router-dom'
import ItemCarrinho from '../components/ItemCarrinho'
import ResumoCompra from '../components/ResumoCompra'
import { produtos } from '../data/produtos'
import { calcularTotal } from '../utils/pagamento'

/**
 * Tela inicial (rota "/"): resumo do carrinho fixo.
 * Renderiza a lista com map e key estavel (RF03) e leva ao pagamento (RF04).
 */
function Carrinho() {
  const total = calcularTotal(produtos)
  const quantidadeItens = produtos.reduce((soma, produto) => soma + produto.quantidade, 0)

  return (
    <main className="pagina" id="conteudo">
      <header className="pagina__cabecalho">
        <h1>Seu carrinho</h1>
        <p className="pagina__apoio">
          Confira os produtos selecionados antes de finalizar a compra.
        </p>
      </header>

      <div className="checkout">
        <section className="checkout__principal" aria-labelledby="produtos-titulo">
          <h2 id="produtos-titulo" className="sr-only">
            Produtos do carrinho
          </h2>

          <ul className="lista-carrinho">
            {produtos.map((produto) => (
              <ItemCarrinho key={produto.id} produto={produto} />
            ))}
          </ul>
        </section>

        <div className="checkout__visual">
          <ResumoCompra quantidadeItens={quantidadeItens} total={total} />

          <Link className="botao botao--primario" to="/pagamento">
            Finalizar compra
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Carrinho
