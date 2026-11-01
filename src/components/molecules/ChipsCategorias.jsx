import PropTypes from 'prop-types'
import Chip from '@mui/material/Chip'
import estilos from './ChipsCategorias.module.css'

/** Estilo dos chips: selecionado em grafite, os demais em branco com borda. */
const estiloChip = (selecionado) => ({
  height: 40,
  px: 0.5,
  fontWeight: 600,
  fontSize: '0.9375rem',
  borderColor: selecionado ? 'var(--cor-primaria)' : 'var(--cor-borda)',
  backgroundColor: selecionado ? 'var(--cor-primaria)' : 'var(--cor-superficie)',
  color: selecionado ? '#fff' : 'var(--cor-texto)',
  '&:hover': {
    backgroundColor: selecionado ? 'var(--cor-primaria-escura)' : 'var(--cor-acento-suave)'
  }
})

/**
 * Filtro rapido por categoria com o Chip do Material UI (bonus).
 * Cada chip e um botao com aria-pressed indicando o selecionado.
 */
function ChipsCategorias({ categorias, categoria, onCategoria }) {
  const opcoes = ['', ...categorias]

  return (
    <ul className={estilos.chips} aria-label="Filtrar por categoria">
      {opcoes.map((nome) => {
        const selecionado = nome === categoria

        return (
          <li key={nome || 'todas'}>
            <Chip
              label={nome || 'Todas'}
              variant="outlined"
              clickable
              aria-pressed={selecionado}
              onClick={() => onCategoria(nome)}
              sx={estiloChip(selecionado)}
            />
          </li>
        )
      })}
    </ul>
  )
}

ChipsCategorias.propTypes = {
  categorias: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoria: PropTypes.string.isRequired,
  onCategoria: PropTypes.func.isRequired
}

export default ChipsCategorias
