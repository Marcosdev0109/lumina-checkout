import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import estilos from './CampoBusca.module.css'

/**
 * Campo de busca controlado com o TextField do Material UI.
 * O valor vem de quem usa o componente (props) e cada digitacao volta pelo onChange.
 * O forwardRef repassa a ref para o input, para a pagina focar o campo com useRef.
 */
const CampoBusca = forwardRef(function CampoBusca({ valor, onChange, rotulo = 'Buscar produtos' }, ref) {
  return (
    <div className={estilos.campo} role="search">
      <TextField
        id="campo-busca"
        label={rotulo}
        type="search"
        placeholder="Ex.: luminaria, lampada, fita"
        autoComplete="off"
        fullWidth
        inputRef={ref}
        value={valor}
        onChange={(evento) => onChange(evento.target.value)}
        sx={{ backgroundColor: 'var(--cor-superficie)' }}
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
