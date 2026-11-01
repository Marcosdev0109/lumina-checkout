import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCarrinho } from '../hooks/useCarrinho'
import EtapasCompra from '../components/molecules/EtapasCompra'

/**
 * Tela de sucesso (rota "/sucesso") - RF13.
 * Confirma a aprovacao da compra simulada e oferece o retorno ao catalogo.
 */
function Sucesso() {
  const { limparCarrinho } = useCarrinho()

  // Compra aprovada: o carrinho e esvaziado assim que a tela abre (RF13).
  useEffect(() => {
    limparCarrinho()
  }, [limparCarrinho])

  return (
    <main className="pagina pagina--resultado" id="conteudo">
      <EtapasCompra etapaAtual={3} />
      <p className="resultado__icone resultado__icone--sucesso" aria-hidden="true">
        &#10003;
      </p>

      <h1>Compra aprovada</h1>

      <p className="pagina__apoio">
        O pagamento foi processado com sucesso. Esta é uma simulação: nenhum valor
        foi cobrado e nenhum dado do cartão foi armazenado.
      </p>

      <Link className="botao botao--primario" to="/produtos">
        Continuar comprando
      </Link>
    </main>
  )
}

export default Sucesso
