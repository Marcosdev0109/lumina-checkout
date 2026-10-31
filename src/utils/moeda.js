// Formatacao de valores monetarios usada em toda a loja.

/** Formata um numero como moeda brasileira (R$ 1.234,56). */
export function formatarMoeda(valor) {
  const numero = Number(valor)
  if (!Number.isFinite(numero)) return 'R$ 0,00'

  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
