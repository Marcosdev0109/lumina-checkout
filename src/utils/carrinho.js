// Regras de calculo do carrinho.
// Funcoes puras: recebem dados e devolvem um resultado, sem alterar nada fora delas.

/** Subtotal de um item: preco unitario multiplicado pela quantidade. */
export function calcularSubtotal(item) {
  return item.preco * item.quantidade
}

/** Total da compra a partir da lista de itens. */
export function calcularTotal(itens) {
  return itens.reduce((total, item) => total + calcularSubtotal(item), 0)
}

/** Quantidade total de unidades no carrinho (usada no contador do Header). */
export function contarItens(itens) {
  return itens.reduce((soma, item) => soma + item.quantidade, 0)
}

/**
 * Mantem a quantidade entre 1 e o estoque disponivel (RF07 / RF08).
 * Valores invalidos viram 1.
 */
export function limitarQuantidade(quantidade, estoque) {
  const inteiro = Math.floor(Number(quantidade))
  if (!Number.isFinite(inteiro) || inteiro < 1) return 1
  return Math.min(inteiro, Math.max(1, estoque))
}

/** Quantas unidades de um produto ja estao no carrinho. */
export function quantidadeNoCarrinho(itens, id) {
  return itens.find((item) => item.id === id)?.quantidade ?? 0
}

/** Indica se ainda cabe mais uma unidade do produto sem passar do estoque. */
export function podeAdicionar(itens, produto) {
  return quantidadeNoCarrinho(itens, produto.id) < produto.estoque
}

/**
 * Adiciona um produto ao carrinho (RF07).
 * - produto novo entra com quantidade 1;
 * - produto repetido soma 1;
 * - se o estoque acabou, devolve o carrinho sem mudancas.
 */
export function adicionarAoCarrinho(itens, produto) {
  if (!podeAdicionar(itens, produto)) return itens

  const jaExiste = itens.some((item) => item.id === produto.id)

  if (!jaExiste) {
    return [...itens, { ...produto, quantidade: 1 }]
  }

  return itens.map((item) =>
    item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
  )
}

/** Altera a quantidade de um item, respeitando o minimo 1 e o estoque. */
export function alterarQuantidadeItem(itens, id, quantidade) {
  return itens.map((item) =>
    item.id === id ? { ...item, quantidade: limitarQuantidade(quantidade, item.estoque) } : item
  )
}

/** Remove um item do carrinho pelo id. */
export function removerDoCarrinho(itens, id) {
  return itens.filter((item) => item.id !== id)
}
