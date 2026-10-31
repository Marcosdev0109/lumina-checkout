import { Link, useParams } from 'react-router-dom'
import Mensagem from '../components/atoms/Mensagem'
import ImagemProduto from '../components/atoms/ImagemProduto'
import Preco from '../components/atoms/Preco'
import { useProduto } from '../hooks/useProduto'
import estilos from './DetalheProduto.module.css'

/** Texto de estoque no singular ou no plural. */
function descreverEstoque(estoque) {
  if (estoque <= 0) return 'Produto esgotado'
  return estoque === 1 ? '1 unidade em estoque' : `${estoque} unidades em estoque`
}

/**
 * Detalhe do produto (rota dinamica "/produtos/:id") - RF05.
 * O id vem da URL pelo useParams.
 */
function DetalheProduto() {
  const { id } = useParams()
  const { produto, carregando, erro } = useProduto(id)

  function renderizarConteudo() {
    if (carregando) {
      return <Mensagem tipo="carregando" titulo="Carregando produto..." />
    }

    if (erro) {
      return (
        <Mensagem tipo="erro" titulo="Ops! Nao conseguimos carregar este produto.">
          <p>{erro}</p>
        </Mensagem>
      )
    }

    if (!produto) {
      return (
        <Mensagem tipo="vazio" titulo="Produto não encontrado">
          <Link className="botao botao--primario" to="/produtos">
            Voltar ao catalogo
          </Link>
        </Mensagem>
      )
    }

    return (
      <article className={estilos.detalhe} aria-labelledby="produto-nome">
        <ImagemProduto className={estilos.imagem} src={produto.imagem} alt={produto.nome} />

        <div className={estilos.informacoes}>
          <p className={estilos.categoria}>{produto.categoria}</p>
          <h1 className={estilos.nome} id="produto-nome">
            {produto.nome}
          </h1>
          <p className={estilos.descricao}>{produto.descricao}</p>
          <Preco className={estilos.preco} valor={produto.preco} />
          <p className={estilos.estoque}>{descreverEstoque(produto.estoque)}</p>

          <div className={estilos.acoes}>
            <button className="botao botao--primario" type="button" disabled={produto.estoque <= 0}>
              Adicionar ao carrinho
            </button>
            <Link className="botao botao--secundario" to="/produtos">
              Voltar ao catalogo
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <main className="pagina pagina--larga" id="conteudo">
      <nav className="trilha" aria-label="Trilha de navegacao">
        <Link to="/produtos">Produtos</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{produto?.nome ?? 'Detalhe'}</span>
      </nav>

      {renderizarConteudo()}
    </main>
  )
}

export default DetalheProduto
