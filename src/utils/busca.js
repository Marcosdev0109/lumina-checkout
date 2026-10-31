// Regras de busca do catalogo. Funcoes puras, testadas em __tests__/busca.test.js.

/** Deixa o texto em minusculas e sem acentos para comparar "Lampada" com "lâmpada". */
export function normalizarTexto(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

/**
 * Filtra os produtos pelo nome, sem diferenciar maiusculas de minusculas (RF04).
 * Termo vazio devolve a lista completa.
 */
export function filtrarProdutos(produtos, termo) {
  const termoNormalizado = normalizarTexto(termo)
  if (!termoNormalizado) return produtos

  return produtos.filter((produto) => normalizarTexto(produto.nome).includes(termoNormalizado))
}
