import PropTypes from 'prop-types'
import Logo from '../atoms/Logo'
import estilos from './CartaoPreview.module.css'

/** Chip EMV dourado desenhado em SVG. */
function Chip() {
  return (
    <svg className={estilos.chip} viewBox="0 0 48 36" focusable="false">
      <defs>
        <linearGradient id="cartao-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6dc9c" />
          <stop offset="0.5" stopColor="#d4a64c" />
          <stop offset="1" stopColor="#a87a2a" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="47" height="35" rx="6" fill="url(#cartao-chip)" stroke="#8a6420" />
      <path
        d="M16 0.5v35M32 0.5v35M0.5 12h15.5M32 12h15.5M0.5 24h15.5M32 24h15.5M16 18h16"
        stroke="#8a6420"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  )
}

/** Simbolo de pagamento por aproximacao. */
function Aproximacao() {
  return (
    <svg className={estilos.aproximacao} viewBox="0 0 24 24" focusable="false">
      <path
        d="M8 6.5a8 8 0 0 1 0 11M11.5 4a12 12 0 0 1 0 16M5 9a4 4 0 0 1 0 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/**
 * Previa realista do cartao (RF12).
 *
 * Recebe por props os valores digitados no formulario e os desenha no cartao.
 * Quando o campo CVV recebe foco, o cartao gira e mostra o verso.
 * E decorativo: a informacao ja esta nos campos, por isso aria-hidden.
 */
function CartaoPreview({ numero = '', titular = '', validade = '', cvv = '', virado = false }) {
  // Mantem so os digitos e monta quatro grupos de quatro, completando
  // com bolinhas o que ainda nao foi digitado.
  const digitos = numero.replace(/\D/g, '')

  const grupos = [0, 1, 2, 3].map((indice) => {
    const grupo = digitos.slice(indice * 4, indice * 4 + 4)
    return grupo + '••••'.slice(grupo.length)
  })

  return (
    <div className={estilos.cena} aria-hidden="true">
      <div className={virado ? `${estilos.cartao} ${estilos.virado}` : estilos.cartao}>
        <div className={`${estilos.face} ${estilos.frente}`}>
          <div className={estilos.topo}>
            <span className={estilos.marca}>
              <Logo tamanho={26} />
              lumina
            </span>
            <span className={estilos.tipo}>Crédito</span>
          </div>

          <div className={estilos.meio}>
            <Chip />
            <Aproximacao />
          </div>

          <p className={estilos.numero}>{grupos.join(' ')}</p>

          <div className={estilos.rodape}>
            <div className={estilos.campo}>
              <span className={estilos.rotulo}>Titular</span>
              <p className={estilos.valor}>{titular || 'Nome do titular'}</p>
            </div>

            <div className={`${estilos.campo} ${estilos.campoDireita}`}>
              <span className={estilos.rotulo}>Validade</span>
              <p className={estilos.valor}>{validade || 'MM/AA'}</p>
            </div>
          </div>
        </div>

        <div className={`${estilos.face} ${estilos.verso}`}>
          <div className={estilos.tarja} />
          <div className={estilos.assinatura}>
            <span className={estilos.cvv}>{cvv || '•••'}</span>
          </div>
          <p className={estilos.aviso}>
            Cartão fictício para demonstração. Nenhum dado é enviado ou armazenado.
          </p>
        </div>
      </div>
    </div>
  )
}

CartaoPreview.propTypes = {
  numero: PropTypes.string,
  titular: PropTypes.string,
  validade: PropTypes.string,
  cvv: PropTypes.string,
  virado: PropTypes.bool
}

export default CartaoPreview
