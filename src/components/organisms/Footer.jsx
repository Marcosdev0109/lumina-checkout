import estilos from './Footer.module.css'

/** Rodape da loja, presente em todas as paginas pelo Layout. */
function Footer() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className={estilos.footer}>
      <p>
        Lumina Store {anoAtual} - projeto acadêmico SC Tech. Pagamento simulado no navegador.
      </p>
    </footer>
  )
}

export default Footer
