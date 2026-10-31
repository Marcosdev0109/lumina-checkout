import FormularioPagamento from '../components/organisms/FormularioPagamento'
import ResumoCompra from '../components/organisms/ResumoCompra'
import { usePagamento } from '../hooks/usePagamento'
import { useCarrinho } from '../hooks/useCarrinho'

/**
 * Tela de pagamento (rota privada "/pagamento") - RF10 e RF11.
 * O total agora vem do CarrinhoContext, e nao mais de um array fixo.
 */
function Pagamento() {
  const { quantidadeTotal, valorTotal } = useCarrinho()
  const { processando, processarCompra } = usePagamento()

  return (
    <main className="pagina" id="conteudo">
      <header className="pagina__cabecalho">
        <h1>Pagamento</h1>
        <p className="pagina__apoio">
          Use dados ficticios. Nenhuma informacao e enviada ou armazenada.
        </p>
      </header>

      <FormularioPagamento onEnviar={processarCompra} processando={processando}>
        <ResumoCompra quantidadeItens={quantidadeTotal} total={valorTotal} titulo="Valor a pagar" />
      </FormularioPagamento>
    </main>
  )
}

export default Pagamento
