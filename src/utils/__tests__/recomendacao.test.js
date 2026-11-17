import { describe, expect, it } from 'vitest'
import { calcularLumens, pontuacaoMaxima, pontuarProduto, recomendar } from '../recomendacao'

const produtos = [
  { id: '1', nome: 'Mesa Aurora', preco: 189.9, estoque: 5, ambientes: ['escritorio'], estilos: ['moderno'], usos: ['leitura'] },
  { id: '2', nome: 'Pendente Nórdico', preco: 349.9, estoque: 4, ambientes: ['sala', 'cozinha'], estilos: ['nordico'], usos: ['geral'] },
  { id: '3', nome: 'Articulada', preco: 229.9, estoque: 3, ambientes: ['escritorio'], estilos: ['industrial'], usos: ['leitura'] },
  { id: '4', nome: 'Esgotada', preco: 99.9, estoque: 0, ambientes: ['escritorio'], estilos: ['moderno'], usos: ['leitura'] }
]

describe('calcularLumens', () => {
  it('multiplica o lux do cômodo pela área e arredonda para a centena de cima', () => {
    expect(calcularLumens('escritorio', 9)).toBe(4500)
    expect(calcularLumens('sala', 12.5)).toBe(1900)
  })

  it('devolve 0 para cômodo desconhecido ou área inválida', () => {
    expect(calcularLumens('garagem', 10)).toBe(0)
    expect(calcularLumens('sala', 0)).toBe(0)
    expect(calcularLumens('sala', 'abc')).toBe(0)
  })
})

describe('pontuarProduto', () => {
  it('soma pontos e explica cada critério atendido', () => {
    const r = pontuarProduto(produtos[0], { ambiente: 'escritorio', estilo: 'moderno', uso: 'leitura' })
    expect(r.pontos).toBe(8)
    expect(r.motivos).toHaveLength(3)
  })

  it('não pontua o que não combina', () => {
    expect(pontuarProduto(produtos[1], { ambiente: 'escritorio', uso: 'leitura' }).pontos).toBe(0)
  })
})

describe('recomendar', () => {
  it('ordena pela pontuação e ignora produto sem estoque', () => {
    const r = recomendar(produtos, { ambiente: 'escritorio', estilo: 'moderno', uso: 'leitura' })
    expect(r.map((x) => x.produto.id)).toEqual(['1', '3'])
  })

  it('respeita o orçamento', () => {
    const r = recomendar(produtos, { ambiente: 'escritorio', uso: 'leitura', orcamento: 200 })
    expect(r.map((x) => x.produto.id)).toEqual(['1'])
  })

  it('desempata pelo menor preço', () => {
    const r = recomendar(produtos, { ambiente: 'escritorio' })
    expect(r.map((x) => x.produto.id)).toEqual(['1', '3'])
  })

  it('devolve lista vazia quando nada combina', () => {
    expect(recomendar(produtos, { ambiente: 'infantil' })).toEqual([])
  })
})

describe('pontuacaoMaxima', () => {
  it('considera só os critérios respondidos', () => {
    expect(pontuacaoMaxima({ ambiente: 'sala', estilo: '', uso: 'geral' })).toBe(6)
  })
})
