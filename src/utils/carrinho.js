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
