import { Link } from 'react-router-dom'

/**
 * Tela de falha (rota "/falha") - RF11 e RF13.
 * Exibe a mensagem exata "tentativa de golpe" e mantem os itens no carrinho.
 */
function Falha() {
  return (
    <main className="pagina pagina--resultado" id="conteudo">
      <p className="resultado__icone resultado__icone--falha" aria-hidden="true">
        !
      </p>

      <h1>Compra não aprovada</h1>

      <p className="resultado__mensagem" role="alert">
        tentativa de golpe
      </p>

      <p className="pagina__apoio">
        O número informado foi recusado pela verificação da loja. Revise os dados
        do cartão e tente novamente.
      </p>

      <Link className="botao botao--primario" to="/pagamento">
        Tentar novamente
      </Link>

      <Link className="link-voltar" to="/carrinho">
        Revisar carrinho
      </Link>
    </main>
  )
}

export default Falha
