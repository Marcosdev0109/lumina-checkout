import PropTypes from 'prop-types'
import estilos from './EtapasCompra.module.css'

const ETAPAS = ['Carrinho', 'Pagamento', 'Confirmação']

/** Indicador das etapas da compra, com aria-current na etapa atual. */
function EtapasCompra({ etapaAtual }) {
  return (
    <ol className={estilos.etapas} aria-label="Etapas da compra">
      {ETAPAS.map((nome, indice) => {
        const numero = indice + 1
        const atual = numero === etapaAtual
        const concluida = numero < etapaAtual

        let classe = estilos.etapa
        if (atual) classe += ` ${estilos.atual}`
        if (concluida) classe += ` ${estilos.concluida}`

        return (
          <li key={nome} className={classe} aria-current={atual ? 'step' : undefined}>
            <span className={estilos.numero} aria-hidden="true">
              {concluida ? '✓' : numero}
            </span>
            <span className={estilos.nome}>
              {nome}
              {concluida && <span className="sr-only"> (concluída)</span>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

EtapasCompra.propTypes = {
  etapaAtual: PropTypes.oneOf([1, 2, 3]).isRequired
}

export default EtapasCompra
