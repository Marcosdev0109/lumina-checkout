import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  adicionarAoCarrinho,
  alterarQuantidadeItem,
  calcularTotal,
  contarItens,
  podeAdicionar,
  quantidadeNoCarrinho,
  removerDoCarrinho
} from '../utils/carrinho'
import { lerCarrinhoSalvo, salvarCarrinho } from '../utils/armazenamento'

/**
 * Contexto do carrinho (RF06).
 * Guarda os itens em um unico lugar e entrega para qualquer pagina,
 * sem precisar repassar props por varios niveis.
 */
export const CarrinhoContext = createContext(null)

export function CarrinhoProvider({ children }) {
  // Inicializacao preguicosa: le o localStorage so na primeira renderizacao.
  const [itens, setItens] = useState(() => lerCarrinhoSalvo())

  // Bonus: sempre que o carrinho muda, ele e salvo para sobreviver ao recarregar.
  useEffect(() => {
    salvarCarrinho(itens)
  }, [itens])

  // useCallback: as funcoes mantem a mesma referencia entre renderizacoes,
  // entao os componentes que as recebem nao sao recriados a toa.
  const adicionarItem = useCallback((produto) => {
    setItens((atuais) => adicionarAoCarrinho(atuais, produto))
  }, [])

  const alterarQuantidade = useCallback((id, quantidade) => {
    setItens((atuais) => alterarQuantidadeItem(atuais, id, quantidade))
  }, [])

  const removerItem = useCallback((id) => {
    setItens((atuais) => removerDoCarrinho(atuais, id))
  }, [])

  const limparCarrinho = useCallback(() => setItens([]), [])

  // useMemo: totais so sao recalculados quando a lista de itens muda.
  const quantidadeTotal = useMemo(() => contarItens(itens), [itens])
  const valorTotal = useMemo(() => calcularTotal(itens), [itens])

  const valor = useMemo(
    () => ({
      itens,
      adicionarItem,
      alterarQuantidade,
      removerItem,
      limparCarrinho,
      quantidadeTotal,
      valorTotal,
      quantidadeDoProduto: (id) => quantidadeNoCarrinho(itens, id),
      podeAdicionarProduto: (produto) => podeAdicionar(itens, produto)
    }),
    [itens, adicionarItem, alterarQuantidade, removerItem, limparCarrinho, quantidadeTotal, valorTotal]
  )

  return <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>
}

CarrinhoProvider.propTypes = {
  children: PropTypes.node.isRequired
}
