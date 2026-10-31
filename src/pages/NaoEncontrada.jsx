import { Link } from 'react-router-dom'

/** Pagina 404, exibida para qualquer rota que nao exista (path="*"). */
function NaoEncontrada() {
  return (
    <main className="pagina pagina--resultado" id="conteudo">
      <p className="resultado__icone resultado__icone--falha" aria-hidden="true">
        404
      </p>

      <h1>Página não encontrada</h1>

      <p className="pagina__apoio">O endereço acessado não existe ou foi removido.</p>

      <Link className="botao botao--primario" to="/produtos">
        Ver produtos
      </Link>
    </main>
  )
}

export default NaoEncontrada
