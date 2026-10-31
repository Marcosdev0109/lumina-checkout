import { z } from 'zod'

/**
 * Esquema de validacao do cartao com Zod (RF10), com as mesmas regras do Mini-Projeto:
 * - titular preenchido;
 * - 16 digitos, desconsiderando espacos e hifens;
 * - validade MM/AA com mes entre 01 e 12;
 * - CVV com 3 digitos.
 */
export const esquemaCartao = z.object({
  titular: z
    .string()
    .trim()
    .min(3, 'Informe o nome do titular como aparece no cartao.'),
  numero: z
    .string()
    .transform((valor) => valor.replace(/[\s-]/g, ''))
    .refine((valor) => /^\d{16}$/.test(valor), {
      message: 'O numero do cartao deve conter 16 digitos.'
    }),
  validade: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use o formato MM/AA, com mes entre 01 e 12.'),
  cvv: z
    .string()
    .trim()
    .regex(/^\d{3}$/, 'O CVV deve conter 3 digitos.')
})
