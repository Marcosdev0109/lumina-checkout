// Regras de negocio da compra simulada.
// Ficam isoladas da interface para poderem ser testadas e reaproveitadas.
// Os calculos do carrinho ficam em carrinho.js e a moeda em moeda.js.

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
