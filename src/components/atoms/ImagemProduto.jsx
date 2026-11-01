import { useState } from 'react'
import PropTypes from 'prop-types'

/** Imagem local exibida quando a foto do produto nao carrega. */
const IMAGEM_RESERVA = `${import.meta.env.BASE_URL}imagens/sem-foto.svg`

/**
 * Foto do produto com texto alternativo obrigatorio.
 * Se a foto externa falhar (sem internet, link fora do ar), troca pela
 * ilustracao local para o card nunca ficar com um espaco quebrado.
 */
function ImagemProduto({ src, alt, className }) {
  const [falhou, setFalhou] = useState(false)

  return (
    <img
      className={className}
      src={falhou ? IMAGEM_RESERVA : src}
      alt={alt}
      loading="lazy"
      width="600"
      height="600"
      onError={() => setFalhou(true)}
    />
  )
}

ImagemProduto.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default ImagemProduto
