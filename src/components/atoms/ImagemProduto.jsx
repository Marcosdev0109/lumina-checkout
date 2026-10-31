import PropTypes from 'prop-types'

/** Foto do produto com texto alternativo obrigatorio. */
function ImagemProduto({ src, alt, className }) {
  return <img className={className} src={src} alt={alt} loading="lazy" width="400" height="400" />
}

ImagemProduto.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default ImagemProduto
