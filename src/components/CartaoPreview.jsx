/**
 * Previa visual do cartao (RF12).
 *
 * Recebe por props os valores que o usuario esta digitando no formulario e
 * os desenha em um cartao. E puramente decorativo: a informacao ja esta
 * disponivel nos campos do formulario, entao o bloco recebe aria-hidden
 * para nao ser lido duas vezes por leitores de tela.
 */
function CartaoPreview({ numero = '', titular = '', validade = '' }) {
  // Mantem so os digitos e monta quatro grupos de quatro, completando
  // com bolinhas o que ainda nao foi digitado.
  const digitos = numero.replace(/\D/g, '')

  const grupos = [0, 1, 2, 3].map((indice) => {
    const grupo = digitos.slice(indice * 4, indice * 4 + 4)
    return grupo + '••••'.slice(grupo.length)
  })

  return (
    <div className="cartao" aria-hidden="true">
      <div className="cartao__topo">
        <span className="cartao__chip" />
        <span className="cartao__marca">Lumina</span>
      </div>

      <p className="cartao__numero">{grupos.join('  ')}</p>

      <div className="cartao__rodape">
        <div className="cartao__campo">
          <span className="cartao__rotulo">Titular</span>
          <p className="cartao__valor">{titular || 'NOME DO TITULAR'}</p>
        </div>

        <div className="cartao__campo cartao__campo--validade">
          <span className="cartao__rotulo">Validade</span>
          <p className="cartao__valor">{validade || 'MM/AA'}</p>
        </div>
      </div>
    </div>
  )
}

export default CartaoPreview
