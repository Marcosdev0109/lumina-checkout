import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CartaoPreview from '../molecules/CartaoPreview'
import { esquemaCartao } from '../../utils/esquemaCartao'
import { mascaraCartao, mascaraValidade, somenteDigitos } from '../../utils/pagamento'

/** Aplica a mascara antes de entregar o valor ao React Hook Form. */
function comMascara(campo, formatar) {
  return (evento) => {
    evento.target.value = formatar(evento.target.value)
    campo.onChange(evento)
  }
}

/**
 * Formulario do cartao com React Hook Form + Zod (RF10).
 * Reaproveitado do Mini-Projeto; agora e um organismo e recebe o envio por props.
 */
function FormularioPagamento({ onEnviar, processando, children }) {
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

  // watch devolve o valor atual dos campos a cada digitacao: alimenta a previa do cartao.
  const [numeroDigitado, titularDigitado, validadeDigitada] = watch(['numero', 'titular', 'validade'])

  const campoNumero = register('numero')
  const campoValidade = register('validade')
  const campoCvv = register('cvv')

  return (
    <div className="checkout">
      <div className="checkout__visual">
        <CartaoPreview numero={numeroDigitado} titular={titularDigitado} validade={validadeDigitada} />
        {children}
      </div>

    <form className="formulario" onSubmit={handleSubmit(onEnviar)} noValidate>
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

      <Link className="link-voltar" to="/carrinho">
        Voltar ao carrinho
      </Link>
    </form>
    </div>
  )
}

FormularioPagamento.propTypes = {
  onEnviar: PropTypes.func.isRequired,
  processando: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default FormularioPagamento
