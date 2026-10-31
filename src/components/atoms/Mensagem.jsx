import PropTypes from 'prop-types'
import estilos from './Mensagem.module.css'

/**
 * Bloco de aviso usado nos estados de carregamento, erro e lista vazia.
 * Erros usam role="alert"; os demais, role="status", para leitores de tela.
 */
function Mensagem({ tipo = 'info', titulo, children }) {
  const ehErro = tipo === 'erro'

  return (
    <div
      className={ehErro ? `${estilos.mensagem} ${estilos.erro}` : estilos.mensagem}
      role={ehErro ? 'alert' : 'status'}
    >
      <p className={estilos.titulo}>{titulo}</p>
      {children}
    </div>
  )
}

Mensagem.propTypes = {
  tipo: PropTypes.oneOf(['info', 'carregando', 'erro', 'vazio']),
  titulo: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Mensagem
