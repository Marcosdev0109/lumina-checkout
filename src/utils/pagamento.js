// Regras de negocio da compra simulada.
// Ficam isoladas da interface para poderem ser testadas e reaproveitadas (RF07).

/**
 * Remove espacos e hifens do numero do cartao.
 * O enunciado pede que esses caracteres sejam desconsiderados na validacao.
 */
export function normalizarCartao(valor) {
  return String(valor ?? '').replace(/[\s-]/g, '')
}

/**
 * Indica se os 16 digitos do cartao sao todos iguais.
 * Esse e o unico criterio de reprovacao da compra simulada.
 */
export function todosDigitosIguais(numeroCartao) {
  const digitos = normalizarCartao(numeroCartao)
  if (digitos.length !== 16) return false
  return /^(\d)\1{15}$/.test(digitos)
}

/** Subtotal de um item: preco unitario multiplicado pela quantidade. */
export function calcularSubtotal(produto) {
  return produto.preco * produto.quantidade
}

/** Total da compra a partir da lista de produtos. */
export function calcularTotal(listaProdutos) {
  return listaProdutos.reduce((total, produto) => total + calcularSubtotal(produto), 0)
}

/** Formata um numero como moeda brasileira (R$ 1.234,56). */
export function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

/**
 * Mascaras de digitacao.
 * Formatam o que o usuario ve enquanto digita, sem alterar as regras de
 * validacao: o schema do Zod continua removendo espacos e hifens antes
 * de contar os digitos.
 */

/** Agrupa o numero do cartao de quatro em quatro: 4111 1111 1111 1111 */
export function mascaraCartao(valor) {
  const digitos = String(valor ?? '').replace(/\D/g, '').slice(0, 16)
  return digitos.replace(/(\d{4})(?=\d)/g, '$1 ')
}

/** Insere a barra da validade automaticamente: 12/29 */
export function mascaraValidade(valor) {
  const digitos = String(valor ?? '').replace(/\D/g, '').slice(0, 4)
  if (digitos.length <= 2) return digitos
  return digitos.slice(0, 2) + '/' + digitos.slice(2)
}

/** Mantem apenas digitos, limitando o tamanho (usado no CVV). */
export function somenteDigitos(valor, maximo) {
  return String(valor ?? '').replace(/\D/g, '').slice(0, maximo)
}
