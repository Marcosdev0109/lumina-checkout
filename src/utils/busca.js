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

/** Lista as categorias existentes, sem repeticao e em ordem alfabetica. */
export function listarCategorias(produtos) {
  return [...new Set(produtos.map((produto) => produto.categoria))].sort((a, b) =>
    a.localeCompare(b, 'pt-BR')
  )
}

/** Filtra pela categoria. Categoria vazia devolve todos os produtos. */
export function filtrarPorCategoria(produtos, categoria) {
  if (!categoria) return produtos
  return produtos.filter((produto) => produto.categoria === categoria)
}

/**
 * Ordena pelo preco sem alterar a lista original.
 * ordem: "menor-preco", "maior-preco" ou "" (mantem a ordem da API).
 */
export function ordenarPorPreco(produtos, ordem) {
  if (ordem === 'menor-preco') return [...produtos].sort((a, b) => a.preco - b.preco)
  if (ordem === 'maior-preco') return [...produtos].sort((a, b) => b.preco - a.preco)
  return produtos
}
