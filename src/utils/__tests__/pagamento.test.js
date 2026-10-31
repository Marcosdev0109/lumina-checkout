import { describe, expect, it } from 'vitest'
import { mascaraCartao, mascaraValidade, normalizarCartao, todosDigitosIguais } from '../pagamento'
import { esquemaCartao } from '../esquemaCartao'

describe('todosDigitosIguais', () => {
  it('identifica cartao com todos os digitos iguais (tentativa de golpe)', () => {
    expect(todosDigitosIguais('1111 1111 1111 1111')).toBe(true)
    expect(todosDigitosIguais('0000-0000-0000-0000')).toBe(true)
  })

  it('aprova cartao com digitos diferentes', () => {
    expect(todosDigitosIguais('4111 1111 1111 1112')).toBe(false)
  })

  it('devolve false quando o cartao nao tem 16 digitos', () => {
    expect(todosDigitosIguais('1111 1111')).toBe(false)
  })
})

describe('normalizarCartao e mascaras', () => {
  it('remove espacos e hifens', () => {
    expect(normalizarCartao('4111 1111-1111 1111')).toBe('4111111111111111')
  })

  it('agrupa o numero de quatro em quatro', () => {
    expect(mascaraCartao('4111111111111111')).toBe('4111 1111 1111 1111')
  })

  it('insere a barra da validade e ignora letras', () => {
    expect(mascaraValidade('12ab29')).toBe('12/29')
  })
})

describe('esquemaCartao (Zod)', () => {
  const valido = { titular: 'Maria Silva', numero: '4111 1111 1111 1112', validade: '12/29', cvv: '123' }

  it('aceita dados validos', () => {
    expect(esquemaCartao.safeParse(valido).success).toBe(true)
  })

  it('recusa mes de validade fora de 01 a 12', () => {
    expect(esquemaCartao.safeParse({ ...valido, validade: '13/29' }).success).toBe(false)
  })

  it('recusa cartao com menos de 16 digitos e CVV invalido', () => {
    expect(esquemaCartao.safeParse({ ...valido, numero: '4111 1111' }).success).toBe(false)
    expect(esquemaCartao.safeParse({ ...valido, cvv: '12' }).success).toBe(false)
  })
})
