import PropTypes from 'prop-types'

/**
 * Marca da Lumina: um pendente minimalista com um feixe de luz quente.
 * Desenhada em SVG inline, sem depender de arquivo externo.
 */
function Logo({ tamanho = 34 }) {
  return (
    <svg viewBox="0 0 40 40" width={tamanho} height={tamanho} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lumina-feixe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8b04b" stopOpacity="0.75" />
          <stop offset="1" stopColor="#e8b04b" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="lumina-brilho" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff4d6" />
          <stop offset="0.6" stopColor="#f2c063" />
          <stop offset="1" stopColor="#d6a04a" />
        </radialGradient>
      </defs>
      <path d="M11 24h18l8 16H3z" fill="url(#lumina-feixe)" />
      <path d="M20 1v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 22.5C9.5 15.6 14.2 10 20 10s10.5 5.6 10.5 12.5z" fill="currentColor" />
      <circle cx="20" cy="23.6" r="3.4" fill="url(#lumina-brilho)" />
    </svg>
  )
}

Logo.propTypes = {
  tamanho: PropTypes.number
}

export default Logo
