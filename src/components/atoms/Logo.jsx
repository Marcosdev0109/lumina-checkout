import PropTypes from 'prop-types'

/** Marca da loja desenhada em SVG inline, sem dependencia de arquivo externo. */
function Logo({ tamanho = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={tamanho} height={tamanho} aria-hidden="true" focusable="false">
      <circle cx="16" cy="13" r="8" fill="#f5c344" />
      <path d="M11 22h10v3a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-3z" fill="#3c3a52" />
      <path
        d="M16 2v2M26 13h2M4 13h2M23.8 5.2l1.4-1.4M6.8 3.8l1.4 1.4"
        stroke="#f5c344"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

Logo.propTypes = {
  tamanho: PropTypes.number
}

export default Logo
