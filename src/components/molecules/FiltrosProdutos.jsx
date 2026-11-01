import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

const OPCOES_ORDEM = [
  { valor: '', rotulo: 'Relevância' },
  { valor: 'menor-preco', rotulo: 'Menor preço' },
  { valor: 'maior-preco', rotulo: 'Maior preço' }
]

/** Seletor de ordenacao do catalogo por preco (bonus). */
function FiltrosProdutos({ ordem, onOrdem }) {
  return (
    <TextField
      id="filtro-ordem"
      select
      label="Ordenar por"
      value={ordem}
      onChange={(evento) => onOrdem(evento.target.value)}
      sx={{ backgroundColor: 'var(--cor-superficie)' }}
    >
      {OPCOES_ORDEM.map((opcao) => (
        <MenuItem key={opcao.valor || 'relevancia'} value={opcao.valor}>
          {opcao.rotulo}
        </MenuItem>
      ))}
    </TextField>
  )
}

FiltrosProdutos.propTypes = {
  ordem: PropTypes.string.isRequired,
  onOrdem: PropTypes.func.isRequired
}

export default FiltrosProdutos
