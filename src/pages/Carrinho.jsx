import { Link } from 'react-router-dom'
import ItemCarrinho from '../components/molecules/ItemCarrinho'
import ResumoCompra from '../components/organisms/ResumoCompra'
import Mensagem from '../components/atoms/Mensagem'
import { useCarrinho } from '../hooks/useCarrinho'

/**
 * Pagina do carrinho (rota "/carrinho") - RF08.
 * Antes lia um array fixo; agora le os itens do CarrinhoContext.
 */
function Carrinho() {
  const { itens, alterarQuantidade, removerItem, quantidadeTotal, valorTotal } = useCarrinho()

  if (itens.length === 0) {
    return (
      <main className="pagina" id="conteudo">
        <header className="pagina__cabecalho">
          <h1>Seu carrinho</h1>
        </header>

        <Mensagem tipo="vazio" titulo="Seu carrinho esta vazio.">
          <p>Escolha seus produtos no catalogo e eles aparecem aqui.</p>
          <Link className="botao botao--primario" to="/produtos">
            Ver produtos
          </Link>
        </Mensagem>
      </main>
    )
  }

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
            {itens.map((item) => (
              <ItemCarrinho
                key={item.id}
                item={item}
                onAlterarQuantidade={alterarQuantidade}
                onRemover={removerItem}
              />
            ))}
          </ul>
        </section>

        <div className="checkout__visual">
          <ResumoCompra quantidadeItens={quantidadeTotal} total={valorTotal} />

          <Link className="botao botao--primario" to="/pagamento">
            Finalizar compra
          </Link>

          <Link className="link-voltar" to="/produtos">
            Continuar comprando
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Carrinho
