import { describe, expect, it } from 'vitest'
import { formatarMoeda } from '../moeda'

// toLocaleString usa espaco nao separavel depois do "R$"; normalizamos para comparar.
const semEspacoEspecial = (texto) => texto.replace(/\s/g, ' ')

describe('formatarMoeda', () => {
  it('formata um valor no padrao brasileiro', () => {
    expect(semEspacoEspecial(formatarMoeda(1234.5))).toBe('R$ 1.234,50')
  })

  it('formata zero', () => {
    expect(semEspacoEspecial(formatarMoeda(0))).toBe('R$ 0,00')
  })

  it('devolve R$ 0,00 para valores invalidos', () => {
    expect(formatarMoeda('abc')).toBe('R$ 0,00')
    expect(formatarMoeda(undefined)).toBe('R$ 0,00')
  })
})
