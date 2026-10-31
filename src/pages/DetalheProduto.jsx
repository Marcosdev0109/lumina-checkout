import { Link, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Mensagem from '../components/atoms/Mensagem'
import ImagemProduto from '../components/atoms/ImagemProduto'
import Preco from '../components/atoms/Preco'
import { useProduto } from '../hooks/useProduto'
import { useCarrinho } from '../hooks/useCarrinho'
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
  const { adicionarItem, podeAdicionarProduto, quantidadeDoProduto } = useCarrinho()

  function renderizarConteudo() {
    if (carregando) {
      return <Mensagem tipo="carregando" titulo="Carregando produto..." />
    }

    if (erro) {
      return (
        <Mensagem tipo="erro" titulo="Ops! Não conseguimos carregar este produto.">
          <p>{erro}</p>
        </Mensagem>
      )
    }

    if (!produto) {
      return (
        <Mensagem tipo="vazio" titulo="Produto não encontrado">
          <Link className="botao botao--primario" to="/produtos">
            Voltar ao catálogo
          </Link>
        </Mensagem>
      )
    }

    const disponivel = podeAdicionarProduto(produto)
    const noCarrinho = quantidadeDoProduto(produto.id)

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
          {noCarrinho > 0 && (
            <p className={estilos.noCarrinho} role="status">
              {noCarrinho} no carrinho
            </p>
          )}

          <div className={estilos.acoes}>
            <Button
              variant="contained"
              size="large"
              onClick={() => adicionarItem(produto)}
              disabled={!disponivel}
            >
              {disponivel ? 'Adicionar ao carrinho' : 'Limite de estoque atingido'}
            </Button>
            <Link className="botao botao--secundario" to="/produtos">
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <main className="pagina pagina--larga" id="conteudo">
      <nav className="trilha" aria-label="Trilha de navegação">
        <Link to="/produtos">Produtos</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{produto?.nome ?? 'Detalhe'}</span>
      </nav>

      {renderizarConteudo()}
    </main>
  )
}

export default DetalheProduto
