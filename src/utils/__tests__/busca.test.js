import { describe, expect, it } from 'vitest'
import {
  filtrarPorCategoria,
  filtrarProdutos,
  listarCategorias,
  normalizarTexto,
  ordenarPorPreco
} from '../busca'

const produtos = [
  { id: '1', nome: 'Luminária de Mesa Aurora' },
  { id: '2', nome: 'Lâmpada Filamento Vintage' },
  { id: '3', nome: 'Fita de LED RGB 5m' }
]

describe('normalizarTexto', () => {
  it('remove acentos e deixa em minusculas', () => {
    expect(normalizarTexto('  LÂMPADA  ')).toBe('lampada')
  })
})

describe('filtrarProdutos', () => {
  it('filtra pelo nome sem diferenciar maiusculas de minusculas', () => {
    const resultado = filtrarProdutos(produtos, 'FITA')
    expect(resultado).toEqual([produtos[2]])
  })

  it('encontra o produto mesmo sem digitar o acento', () => {
    expect(filtrarProdutos(produtos, 'lampada')).toEqual([produtos[1]])
  })

  it('devolve a lista completa quando o termo esta vazio', () => {
    expect(filtrarProdutos(produtos, '   ')).toEqual(produtos)
  })

  it('devolve lista vazia quando nenhum produto corresponde', () => {
    expect(filtrarProdutos(produtos, 'geladeira')).toEqual([])
  })
})

describe('filtro por categoria e ordenacao', () => {
  const catalogo = [
    { id: '1', nome: 'A', categoria: 'Pendentes', preco: 300 },
    { id: '2', nome: 'B', categoria: 'Lâmpadas', preco: 40 },
    { id: '3', nome: 'C', categoria: 'Pendentes', preco: 150 }
  ]

  it('lista categorias sem repeticao e em ordem alfabetica', () => {
    expect(listarCategorias(catalogo)).toEqual(['Lâmpadas', 'Pendentes'])
  })

  it('filtra pela categoria escolhida', () => {
    expect(filtrarPorCategoria(catalogo, 'Pendentes').map((p) => p.id)).toEqual(['1', '3'])
  })

  it('devolve todos quando nenhuma categoria e escolhida', () => {
    expect(filtrarPorCategoria(catalogo, '')).toBe(catalogo)
  })

  it('ordena do menor para o maior preco sem alterar a lista original', () => {
    expect(ordenarPorPreco(catalogo, 'menor-preco').map((p) => p.preco)).toEqual([40, 150, 300])
    expect(catalogo.map((p) => p.id)).toEqual(['1', '2', '3'])
  })

  it('ordena do maior para o menor preco', () => {
    expect(ordenarPorPreco(catalogo, 'maior-preco').map((p) => p.preco)).toEqual([300, 150, 40])
  })
})
