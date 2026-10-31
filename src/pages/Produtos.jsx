import ListaProdutos from '../components/organisms/ListaProdutos'
import Mensagem from '../components/atoms/Mensagem'
import { useProdutos } from '../hooks/useProdutos'

/**
 * Pagina do catalogo (rota "/produtos") - RF02.
 * Trata os estados de carregamento, erro e lista vazia antes de desenhar a grade.
 */
function Produtos() {
  const { produtos, carregando, erro, recarregar } = useProdutos()

  function renderizarConteudo() {
    if (carregando) {
      return <Mensagem tipo="carregando" titulo="Carregando produtos..." />
    }

    if (erro) {
      return (
        <Mensagem tipo="erro" titulo="Ops! Nao conseguimos carregar o catalogo.">
          <p>{erro}</p>
          <button className="botao botao--primario" type="button" onClick={recarregar}>
            Tentar novamente
          </button>
        </Mensagem>
      )
    }

    if (produtos.length === 0) {
      return <Mensagem tipo="vazio" titulo="Nenhum produto cadastrado no momento." />
    }

    return <ListaProdutos produtos={produtos} />
  }

  return (
    <main className="pagina pagina--larga" id="conteudo">
      <header className="pagina__cabecalho">
        <h1>Produtos</h1>
        <p className="pagina__apoio">Iluminacao para todos os ambientes da sua casa.</p>
      </header>

      {renderizarConteudo()}
    </main>
  )
}

export default Produtos
