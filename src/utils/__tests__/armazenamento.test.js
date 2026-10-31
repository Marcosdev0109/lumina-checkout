import { describe, expect, it } from 'vitest'
import { lerCarrinhoSalvo, salvarCarrinho } from '../armazenamento'

/** Armazenamento falso em memoria, com a mesma interface do localStorage. */
function criarArmazenamento() {
  const dados = {}
  return {
    getItem: (chave) => (chave in dados ? dados[chave] : null),
    setItem: (chave, valor) => {
      dados[chave] = String(valor)
    }
  }
}

describe('armazenamento do carrinho', () => {
  it('salva e le o carrinho', () => {
    const armazenamento = criarArmazenamento()
    const itens = [{ id: '1', quantidade: 2 }]
    salvarCarrinho(itens, armazenamento)
    expect(lerCarrinhoSalvo(armazenamento)).toEqual(itens)
  })

  it('devolve lista vazia quando o conteudo salvo esta corrompido', () => {
    const armazenamento = criarArmazenamento()
    armazenamento.setItem('lumina-store:carrinho', '{quebrado')
    expect(lerCarrinhoSalvo(armazenamento)).toEqual([])
  })

  it('nao quebra quando o armazenamento esta bloqueado', () => {
    const bloqueado = {
      getItem: () => {
        throw new Error('bloqueado')
      },
      setItem: () => {
        throw new Error('bloqueado')
      }
    }
    expect(lerCarrinhoSalvo(bloqueado)).toEqual([])
    expect(() => salvarCarrinho([], bloqueado)).not.toThrow()
  })
})
