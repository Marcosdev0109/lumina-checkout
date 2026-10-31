import PropTypes from 'prop-types'
import estilos from './SeletorQuantidade.module.css'

/** Botoes de diminuir e aumentar quantidade, com limite minimo e maximo. */
function SeletorQuantidade({ quantidade, maximo, onAlterar, nomeProduto }) {
  return (
    <div className={estilos.seletor} role="group" aria-label={`Quantidade de ${nomeProduto}`}>
      <button
        className={estilos.botao}
        type="button"
        onClick={() => onAlterar(quantidade - 1)}
        disabled={quantidade <= 1}
        aria-label={`Diminuir quantidade de ${nomeProduto}`}
      >
        &minus;
      </button>

      <span className={estilos.valor} aria-live="polite">
        {quantidade}
      </span>

      <button
        className={estilos.botao}
        type="button"
        onClick={() => onAlterar(quantidade + 1)}
        disabled={quantidade >= maximo}
        aria-label={`Aumentar quantidade de ${nomeProduto}`}
      >
        +
      </button>
    </div>
  )
}

SeletorQuantidade.propTypes = {
  quantidade: PropTypes.number.isRequired,
  maximo: PropTypes.number.isRequired,
  onAlterar: PropTypes.func.isRequired,
  nomeProduto: PropTypes.string.isRequired
}

export default SeletorQuantidade
