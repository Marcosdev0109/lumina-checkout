import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ResumoCompra from '../components/ResumoCompra'
import CartaoPreview from '../components/CartaoPreview'
import { usePagamento } from '../hooks/usePagamento'
import { produtos } from '../data/produtos'
import {
  calcularTotal,
  mascaraCartao,
  mascaraValidade,
  somenteDigitos
} from '../utils/pagamento'

/**
 * Esquema de validacao de formato do cartao (RF06).
 * Espacos e hifens sao removidos antes da verificacao dos 16 digitos.
 * Nao ha validacao de bandeira, Luhn ou data de vencimento, conforme o enunciado.
 */
const esquemaCartao = z.object({
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

/**
 * Tela de pagamento (rota "/pagamento").
 * Formulario com React Hook Form + Zod e processamento assincrono via custom hook.
 */
function Pagamento() {
  const total = calcularTotal(produtos)
  const quantidadeItens = produtos.reduce((soma, produto) => soma + produto.quantidade, 0)

  const { processando, processarCompra } = usePagamento()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(esquemaCartao),
    mode: 'onSubmit',
    defaultValues: { titular: '', numero: '', validade: '', cvv: '' }
  })

  // O watch do React Hook Form devolve o valor atual dos campos a cada
  // digitacao. E com ele que a previa do cartao vai sendo preenchida.
  const [numeroDigitado, titularDigitado, validadeDigitada] = watch([
    'numero',
    'titular',
    'validade'
  ])

  // Registros dos campos com mascara. A formatacao acontece antes de o
  // React Hook Form receber o valor, entao o estado do formulario e o que
  // o usuario ve ficam sempre iguais.
  const campoNumero = register('numero')
  const campoValidade = register('validade')
  const campoCvv = register('cvv')

  function comMascara(campo, formatar) {
    return (evento) => {
      evento.target.value = formatar(evento.target.value)
      campo.onChange(evento)
    }
  }

  return (
    <main className="pagina" id="conteudo">
      <header className="pagina__cabecalho">
        <h1>Pagamento</h1>
        <p className="pagina__apoio">
          Use dados ficticios. Nenhuma informacao e enviada ou armazenada.
        </p>
      </header>

      <div className="checkout">
        <div className="checkout__visual">
          <CartaoPreview
            numero={numeroDigitado}
            titular={titularDigitado}
            validade={validadeDigitada}
          />

          <ResumoCompra
            quantidadeItens={quantidadeItens}
            total={total}
            titulo="Valor a pagar"
          />
        </div>

        <form className="formulario" onSubmit={handleSubmit(processarCompra)} noValidate>
          <div className="campo">
            <label htmlFor="titular">Nome do titular</label>
            <input
              id="titular"
              type="text"
              autoComplete="off"
              placeholder="Como aparece no cartao"
              aria-invalid={errors.titular ? 'true' : 'false'}
              aria-describedby={errors.titular ? 'erro-titular' : undefined}
              {...register('titular')}
            />
            {errors.titular && (
              <p className="campo__erro" id="erro-titular" role="alert">
                {errors.titular.message}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="numero">Numero do cartao</label>
            <input
              id="numero"
              type="text"
              inputMode="numeric"
              maxLength={19}
              autoComplete="off"
              placeholder="0000 0000 0000 0000"
              aria-invalid={errors.numero ? 'true' : 'false'}
              aria-describedby={errors.numero ? 'erro-numero' : 'ajuda-numero'}
              {...campoNumero}
              onChange={comMascara(campoNumero, mascaraCartao)}
            />
            {errors.numero ? (
              <p className="campo__erro" id="erro-numero" role="alert">
                {errors.numero.message}
              </p>
            ) : (
              <p className="campo__ajuda" id="ajuda-numero">
                Espacos e hifens sao ignorados.
              </p>
            )}
          </div>

          <div className="campo-duplo">
            <div className="campo">
              <label htmlFor="validade">Validade</label>
              <input
                id="validade"
                type="text"
                inputMode="numeric"
                maxLength={5}
                autoComplete="off"
                placeholder="MM/AA"
                aria-invalid={errors.validade ? 'true' : 'false'}
                aria-describedby={errors.validade ? 'erro-validade' : undefined}
                {...campoValidade}
                onChange={comMascara(campoValidade, mascaraValidade)}
              />
              {errors.validade && (
                <p className="campo__erro" id="erro-validade" role="alert">
                  {errors.validade.message}
                </p>
              )}
            </div>

            <div className="campo">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="text"
                inputMode="numeric"
                maxLength={3}
                autoComplete="off"
                placeholder="000"
                aria-invalid={errors.cvv ? 'true' : 'false'}
                aria-describedby={errors.cvv ? 'erro-cvv' : undefined}
                {...campoCvv}
                onChange={comMascara(campoCvv, (valor) => somenteDigitos(valor, 3))}
              />
              {errors.cvv && (
                <p className="campo__erro" id="erro-cvv" role="alert">
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>

          <button className="botao botao--primario" type="submit" disabled={processando}>
            {processando ? 'Processando compra…' : 'Pagar agora'}
          </button>

          <p className="formulario__status" role="status" aria-live="polite">
            {processando ? 'Processando compra…' : ''}
          </p>

          <Link className="link-voltar" to="/">
            Voltar ao carrinho
          </Link>
        </form>
      </div>
    </main>
  )
}

export default Pagamento
