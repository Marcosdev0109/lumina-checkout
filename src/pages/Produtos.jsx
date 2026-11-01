import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ListaProdutos from '../components/organisms/ListaProdutos'
import Mensagem from '../components/atoms/Mensagem'
import CampoBusca from '../components/atoms/CampoBusca'
import FiltrosProdutos from '../components/molecules/FiltrosProdutos'
import DestaqueCatalogo from '../components/organisms/DestaqueCatalogo'
import { useProdutos } from '../hooks/useProdutos'
import { useCarrinho } from '../hooks/useCarrinho'
import { filtrarPorCategoria, filtrarProdutos, listarCategorias, ordenarPorPreco } from '../utils/busca'

/**
 * Pagina do catalogo (rota "/produtos") - RF02.
 * Trata os estados de carregamento, erro e lista vazia antes de desenhar a grade.
 * A busca (RF04) usa um campo controlado e a lista filtrada e calculada com useMemo.
 */
function Produtos() {
  const { produtos, carregando, erro, recarregar } = useProdutos()
  const { adicionarItem, podeAdicionarProduto } = useCarrinho()
  // Bonus: o termo comeca com o que estiver na URL (ex.: /produtos?busca=lampada).
  const [parametrosUrl, setParametrosUrl] = useSearchParams()
  const [termo, setTermo] = useState(() => parametrosUrl.get('busca') ?? '')
  const [categoria, setCategoria] = useState('')
  const [ordem, setOrdem] = useState('')
  const campoBuscaRef = useRef(null)

  const categorias = useMemo(() => listarCategorias(produtos), [produtos])

  // useMemo: so refaz o filtro quando a lista, o termo, a categoria ou a ordem mudam,
  // e nao a cada nova renderizacao da pagina.
  const produtosFiltrados = useMemo(() => {
    const porNome = filtrarProdutos(produtos, termo)
    const porCategoria = filtrarPorCategoria(porNome, categoria)
    return ordenarPorPreco(porCategoria, ordem)
  }, [produtos, termo, categoria, ordem])

  // Mantem a URL sincronizada com o campo, sem criar uma entrada nova no historico a cada tecla.
  useEffect(() => {
    const termoNaUrl = parametrosUrl.get('busca') ?? ''
    if (termoNaUrl === termo) return

    setParametrosUrl(termo ? { busca: termo } : {}, { replace: true })
  }, [termo, parametrosUrl, setParametrosUrl])

  // useRef: foca o campo de busca assim que a pagina abre.
  useEffect(() => {
    campoBuscaRef.current?.focus()
  }, [])

  function limparBusca() {
    setTermo('')
    setCategoria('')
    campoBuscaRef.current?.focus()
  }

  function renderizarConteudo() {
    if (carregando) {
      return <Mensagem tipo="carregando" titulo="Carregando produtos..." />
    }

    if (erro) {
      return (
        <Mensagem tipo="erro" titulo="Ops! Não conseguimos carregar o catálogo.">
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
          <p>
            {termo
              ? `Não encontramos produtos com "${termo}".`
              : 'Não há produtos nesta categoria.'}
          </p>
          <button className="botao botao--secundario" type="button" onClick={limparBusca}>
            Limpar busca
          </button>
        </Mensagem>
      )
    }

    return (
      <ListaProdutos
        produtos={produtosFiltrados}
        onAdicionar={adicionarItem}
        podeAdicionar={podeAdicionarProduto}
      />
    )
  }

  return (
    <main className="pagina pagina--larga" id="conteudo">
      <DestaqueCatalogo />

      <div className="barra-filtros">
        <CampoBusca ref={campoBuscaRef} valor={termo} onChange={setTermo} />
        <FiltrosProdutos
          categorias={categorias}
          categoria={categoria}
          ordem={ordem}
          onCategoria={setCategoria}
          onOrdem={setOrdem}
        />
      </div>

      {renderizarConteudo()}
    </main>
  )
}

export default Produtos
