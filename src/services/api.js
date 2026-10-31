// Servico unico de acesso aos produtos.
//
// Existem duas fontes de dados, escolhidas pela variavel VITE_USAR_API:
// - "true"  (desenvolvimento): json-server rodando em VITE_URL_API (porta 3001);
// - "false" (producao/deploy): arquivo estatico db.json copiado para public/,
//   lido inteiro e filtrado no front-end, ja que o json-server roda so localmente.

const USAR_API = import.meta.env.VITE_USAR_API === 'true'
const URL_API = import.meta.env.VITE_URL_API || 'http://localhost:3001'
const URL_ARQUIVO_ESTATICO = `${import.meta.env.BASE_URL}db.json`

const MENSAGEM_FALHA = 'Nao foi possivel carregar os produtos. Verifique se a API esta rodando e tente novamente.'

/** Faz a requisicao e devolve o JSON, tratando falhas de rede e respostas de erro. */
async function requisitar(url) {
  let resposta

  try {
    resposta = await fetch(url)
  } catch {
    // fetch so rejeita em falha de rede (API fora do ar, sem internet).
    throw new Error(MENSAGEM_FALHA)
  }

  if (resposta.status === 404) return null

  if (!resposta.ok) {
    throw new Error(MENSAGEM_FALHA)
  }

  return resposta.json()
}

/** Le o db.json estatico e devolve a colecao de produtos. */
async function lerProdutosEstaticos() {
  const banco = await requisitar(URL_ARQUIVO_ESTATICO)
  return banco?.produtos ?? []
}

/** GET /produtos - lista todos os produtos. */
export async function listarProdutos() {
  if (!USAR_API) return lerProdutosEstaticos()

  const produtos = await requisitar(`${URL_API}/produtos`)
  return produtos ?? []
}

/**
 * GET /produtos/:id - busca um produto pelo id.
 * Devolve null quando o produto nao existe (status 404).
 */
export async function buscarProdutoPorId(id) {
  if (!USAR_API) {
    const produtos = await lerProdutosEstaticos()
    return produtos.find((produto) => produto.id === String(id)) ?? null
  }

  return requisitar(`${URL_API}/produtos/${encodeURIComponent(id)}`)
}
