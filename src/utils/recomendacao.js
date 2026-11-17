// Regras do Assistente de Iluminação. Funções puras, testadas em __tests__/recomendacao.test.js.

/**
 * Iluminância de referência (lux) por cômodo, baseada nas faixas usuais de
 * iluminação residencial e na NBR ISO/CIE 8995-1 para áreas de trabalho (500 lux).
 */
export const AMBIENTES = {
  sala: { nome: 'Sala', lux: 150 },
  quarto: { nome: 'Quarto', lux: 150 },
  cozinha: { nome: 'Cozinha', lux: 300 },
  escritorio: { nome: 'Escritório', lux: 500 },
  infantil: { nome: 'Quarto infantil', lux: 200 }
}

export const ESTILOS = {
  moderno: 'Moderno',
  minimalista: 'Minimalista',
  nordico: 'Nórdico',
  industrial: 'Industrial',
  retro: 'Retrô'
}

export const USOS = {
  geral: 'Iluminar o cômodo todo',
  leitura: 'Ler, estudar ou trabalhar',
  ambiente: 'Deixar o clima aconchegante',
  decorativo: 'Decorar e dar destaque'
}

const PESOS = { ambiente: 3, uso: 3, estilo: 2 }

/**
 * Lúmens necessários para o cômodo: lux de referência x área (m²).
 * Arredonda para a centena de cima, como se faz ao escolher lâmpadas.
 */
export function calcularLumens(ambiente, area) {
  const lux = AMBIENTES[ambiente]?.lux
  const metros = Number(area)
  if (!lux || !Number.isFinite(metros) || metros <= 0) return 0
  return Math.ceil((lux * metros) / 100) * 100
}

/** Pontua um produto pelas respostas e explica cada ponto em linguagem simples. */
export function pontuarProduto(produto, { ambiente, estilo, uso }) {
  const motivos = []
  let pontos = 0

  if (ambiente && produto.ambientes?.includes(ambiente)) {
    pontos += PESOS.ambiente
    motivos.push(`Indicado para ${AMBIENTES[ambiente].nome.toLowerCase()}`)
  }
  if (uso && produto.usos?.includes(uso)) {
    pontos += PESOS.uso
    motivos.push(`Bom para ${USOS[uso].charAt(0).toLowerCase()}${USOS[uso].slice(1)}`)
  }
  if (estilo && produto.estilos?.includes(estilo)) {
    pontos += PESOS.estilo
    motivos.push(`Combina com o estilo ${ESTILOS[estilo].toLowerCase()}`)
  }

  return { pontos, motivos }
}

/**
 * Recomenda até `limite` produtos para as respostas do cliente.
 * - ignora produtos sem estoque e acima do orçamento (quando informado);
 * - exige pelo menos um critério atendido;
 * - desempata pelo menor preço.
 */
export function recomendar(produtos, respostas, limite = 3) {
  const orcamento = Number(respostas.orcamento) || Infinity

  return produtos
    .filter((produto) => produto.estoque > 0 && produto.preco <= orcamento)
    .map((produto) => ({ produto, ...pontuarProduto(produto, respostas) }))
    .filter((item) => item.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos || a.produto.preco - b.produto.preco)
    .slice(0, limite)
}

/** Pontuação máxima possível para as respostas dadas, usada para mostrar a compatibilidade em %. */
export function pontuacaoMaxima({ ambiente, estilo, uso }) {
  return (ambiente ? PESOS.ambiente : 0) + (uso ? PESOS.uso : 0) + (estilo ? PESOS.estilo : 0)
}
