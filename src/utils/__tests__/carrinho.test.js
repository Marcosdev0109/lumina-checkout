import { describe, expect, it } from 'vitest'
import {
  adicionarAoCarrinho,
  alterarQuantidadeItem,
  calcularTotal,
  contarItens,
  limitarQuantidade,
  removerDoCarrinho
} from '../carrinho'

const luminaria = { id: '1', nome: 'Luminária', preco: 100, estoque: 2 }
const lampada = { id: '2', nome: 'Lâmpada', preco: 39.9, estoque: 10 }

describe('calcularTotal', () => {
  it('soma preco vezes quantidade de cada item', () => {
    const itens = [
      { ...luminaria, quantidade: 2 },
      { ...lampada, quantidade: 3 }
    ]
    expect(calcularTotal(itens)).toBeCloseTo(319.7)
  })

  it('devolve zero para carrinho vazio', () => {
    expect(calcularTotal([])).toBe(0)
  })
})

describe('contarItens', () => {
  it('soma as quantidades de todos os itens', () => {
    expect(contarItens([{ quantidade: 2 }, { quantidade: 3 }])).toBe(5)
  })

  it('devolve zero para carrinho vazio', () => {
    expect(contarItens([])).toBe(0)
  })
})

describe('limitarQuantidade', () => {
  it('mantem quantidades validas', () => {
    expect(limitarQuantidade(3, 5)).toBe(3)
  })

  it('nao deixa passar do estoque', () => {
    expect(limitarQuantidade(9, 5)).toBe(5)
  })

  it('nao deixa ficar abaixo de 1', () => {
    expect(limitarQuantidade(0, 5)).toBe(1)
    expect(limitarQuantidade(-2, 5)).toBe(1)
    expect(limitarQuantidade('abc', 5)).toBe(1)
  })
})

describe('adicionarAoCarrinho', () => {
  it('inclui um produto novo com quantidade 1', () => {
    expect(adicionarAoCarrinho([], luminaria)).toEqual([{ ...luminaria, quantidade: 1 }])
  })

  it('soma 1 quando o produto ja esta no carrinho', () => {
    const itens = [{ ...luminaria, quantidade: 1 }]
    expect(adicionarAoCarrinho(itens, luminaria)[0].quantidade).toBe(2)
  })

  it('nao ultrapassa o estoque do produto', () => {
    const itens = [{ ...luminaria, quantidade: 2 }]
    expect(adicionarAoCarrinho(itens, luminaria)).toBe(itens)
  })

  it('nao altera o array original', () => {
    const itens = []
    adicionarAoCarrinho(itens, lampada)
    expect(itens).toEqual([])
  })
})

describe('alterarQuantidadeItem e removerDoCarrinho', () => {
  const itens = [
    { ...luminaria, quantidade: 1 },
    { ...lampada, quantidade: 4 }
  ]

  it('altera a quantidade respeitando o estoque', () => {
    expect(alterarQuantidadeItem(itens, '2', 6)[1].quantidade).toBe(6)
    expect(alterarQuantidadeItem(itens, '1', 7)[0].quantidade).toBe(2)
  })

  it('nao deixa a quantidade ficar abaixo de 1', () => {
    expect(alterarQuantidadeItem(itens, '2', 0)[1].quantidade).toBe(1)
  })

  it('remove apenas o item informado', () => {
    expect(removerDoCarrinho(itens, '1')).toEqual([itens[1]])
  })

  it('mantem o carrinho quando o id nao existe', () => {
    expect(removerDoCarrinho(itens, '99')).toEqual(itens)
  })
})
