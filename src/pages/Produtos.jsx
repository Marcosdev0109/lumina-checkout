import { useEffect, useMemo, useRef, useState } from 'react'
import ListaProdutos from '../components/organisms/ListaProdutos'
import Mensagem from '../components/atoms/Mensagem'
import CampoBusca from '../components/atoms/CampoBusca'
import { useProdutos } from '../hooks/useProdutos'
import { filtrarProdutos } from '../utils/busca'

/**
 * Pagina do catalogo (rota "/produtos") - RF02.
 * Trata os estados de carregamento, erro e lista vazia antes de desenhar a grade.
 * A busca (RF04) usa um campo controlado e a lista filtrada e calculada com useMemo.
 */
function Produtos() {
  const { produtos, carregando, erro, recarregar } = useProdutos()
  const [termo, setTermo] = useState('')
  const campoBuscaRef = useRef(null)

  // useMemo: so refaz o filtro quando a lista ou o termo mudam,
  // e nao a cada nova renderizacao da pagina.
  const produtosFiltrados = useMemo(() => filtrarProdutos(produtos, termo), [produtos, termo])

  // useRef: foca o campo de busca assim que a pagina abre.
  useEffect(() => {
    campoBuscaRef.current?.focus()
  }, [])

  function limparBusca() {
    setTermo('')
    campoBuscaRef.current?.focus()
  }

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

    if (produtosFiltrados.length === 0) {
      return (
        <Mensagem tipo="vazio" titulo="Nenhum produto encontrado">
          <p>Nao encontramos produtos com &quot;{termo}&quot;.</p>
          <button className="botao botao--secundario" type="button" onClick={limparBusca}>
            Limpar busca
          </button>
        </Mensagem>
      )
    }

    return <ListaProdutos produtos={produtosFiltrados} />
  }

  return (
    <main className="pagina pagina--larga" id="conteudo">
      <header className="pagina__cabecalho">
        <h1>Produtos</h1>
        <p className="pagina__apoio">Iluminacao para todos os ambientes da sua casa.</p>
      </header>

      <div className="barra-filtros">
        <CampoBusca ref={campoBuscaRef} valor={termo} onChange={setTermo} />
      </div>

      {renderizarConteudo()}
    </main>
  )
}

export default Produtos
