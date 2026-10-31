import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import estilos from './CampoBusca.module.css'

/**
 * Campo de busca controlado: o valor vem de quem usa o componente (props)
 * e cada digitacao e devolvida pelo onChange.
 * O forwardRef permite que a pagina foque o campo com useRef.
 */
const CampoBusca = forwardRef(function CampoBusca({ valor, onChange, rotulo = 'Buscar produtos' }, ref) {
  return (
    <div className={estilos.campo} role="search">
      <label className={estilos.rotulo} htmlFor="campo-busca">
        {rotulo}
      </label>
      <input
        ref={ref}
        id="campo-busca"
        className={estilos.entrada}
        type="search"
        placeholder="Ex.: luminaria, lampada, fita"
        autoComplete="off"
        value={valor}
        onChange={(evento) => onChange(evento.target.value)}
      />
    </div>
  )
})

CampoBusca.propTypes = {
  valor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rotulo: PropTypes.string
}

export default CampoBusca
