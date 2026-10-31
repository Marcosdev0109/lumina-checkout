import { describe, expect, it } from 'vitest'
import { filtrarProdutos, normalizarTexto } from '../busca'

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
