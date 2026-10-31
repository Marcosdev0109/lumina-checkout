import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

const OPCOES_ORDEM = [
  { valor: '', rotulo: 'Relevância' },
  { valor: 'menor-preco', rotulo: 'Menor preço' },
  { valor: 'maior-preco', rotulo: 'Maior preço' }
]

/** Seletores de categoria e de ordenacao do catalogo (bonus). */
function FiltrosProdutos({ categorias, categoria, ordem, onCategoria, onOrdem }) {
  return (
    <>
      <TextField
        id="filtro-categoria"
        select
        label="Categoria"
        value={categoria}
        onChange={(evento) => onCategoria(evento.target.value)}
        sx={{ backgroundColor: 'var(--cor-superficie)' }}
      >
        <MenuItem value="">Todas as categorias</MenuItem>
        {categorias.map((nome) => (
          <MenuItem key={nome} value={nome}>
            {nome}
          </MenuItem>
        ))}
      </TextField>

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
    </>
  )
}

FiltrosProdutos.propTypes = {
  categorias: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoria: PropTypes.string.isRequired,
  ordem: PropTypes.string.isRequired,
  onCategoria: PropTypes.func.isRequired,
  onOrdem: PropTypes.func.isRequired
}

export default FiltrosProdutos
