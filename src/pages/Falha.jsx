import { Link } from 'react-router-dom'

/**
 * Tela de falha (rota "/falha") - RF11.
 * Exibe a mensagem exata exigida pelo enunciado: "tentativa de golpe".
 */
function Falha() {
  return (
    <main className="pagina pagina--resultado" id="conteudo">
      <p className="resultado__icone resultado__icone--falha" aria-hidden="true">
        !
      </p>

      <h1>Compra nao aprovada</h1>

      <p className="resultado__mensagem" role="alert">
        tentativa de golpe
      </p>

      <p className="pagina__apoio">
        O numero informado foi recusado pela verificacao da loja. Revise os dados
        do cartao e tente novamente.
      </p>

      <Link className="botao botao--primario" to="/pagamento">
        Tentar novamente
      </Link>
    </main>
  )
}

export default Falha
