import estilos from './DestaqueCatalogo.module.css'

/** Faixa de destaque no topo do catalogo, com o titulo principal da pagina. */
function DestaqueCatalogo() {
  return (
    <header className={estilos.destaque}>
      <p className={estilos.selo}>Catálogo Lumina</p>
      <h1 className={estilos.titulo}>Luz que transforma ambientes</h1>
      <p className={estilos.texto}>
        Luminárias, pendentes, lâmpadas e fitas de LED para todos os cômodos da sua casa.
      </p>
    </header>
  )
}

export default DestaqueCatalogo
