// Persistencia do carrinho no localStorage (bonus).
// O acesso fica protegido por try/catch: em aba anonima ou com o armazenamento
// bloqueado, a loja continua funcionando, apenas sem lembrar o carrinho.

const CHAVE_CARRINHO = 'lumina-store:carrinho'

/** Le o carrinho salvo. Devolve [] se nao houver nada valido. */
export function lerCarrinhoSalvo(armazenamento = globalThis.localStorage) {
  try {
    const salvo = JSON.parse(armazenamento?.getItem(CHAVE_CARRINHO) ?? '[]')
    return Array.isArray(salvo) ? salvo : []
  } catch {
    return []
  }
}

/** Salva o carrinho atual. Falhas sao ignoradas de proposito. */
export function salvarCarrinho(itens, armazenamento = globalThis.localStorage) {
  try {
    armazenamento?.setItem(CHAVE_CARRINHO, JSON.stringify(itens))
  } catch {
    // Sem armazenamento disponivel: segue sem persistir.
  }
}
