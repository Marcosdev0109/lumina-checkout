import { Link } from 'react-router-dom'

/**
 * Tela de sucesso (rota "/sucesso") - RF10.
 * Confirma a aprovacao da compra simulada e oferece retorno ao carrinho.
 */
function Sucesso() {
  return (
    <main className="pagina pagina--resultado" id="conteudo">
      <p className="resultado__icone resultado__icone--sucesso" aria-hidden="true">
        &#10003;
      </p>

      <h1>Compra aprovada</h1>

      <p className="pagina__apoio">
        O pagamento foi processado com sucesso. Esta e uma simulacao: nenhum valor
        foi cobrado e nenhum dado do cartao foi armazenado.
      </p>

      <Link className="botao botao--primario" to="/">
        Voltar ao carrinho
      </Link>
    </main>
  )
}

export default Sucesso
