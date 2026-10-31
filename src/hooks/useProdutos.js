import { useCallback, useEffect, useState } from 'react'
import { listarProdutos } from '../services/api'

/**
 * Carrega a lista de produtos da API (RF02).
 * Devolve os tres estados que a pagina precisa tratar: carregando, erro e a lista.
 */
export function useProdutos() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    // Evita atualizar o estado se a pagina for fechada antes da resposta chegar.
    let ativo = true

    async function carregar() {
      setCarregando(true)
      setErro(null)

      try {
        const lista = await listarProdutos()
        if (ativo) setProdutos(lista)
      } catch (falha) {
        if (ativo) setErro(falha.message)
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregar()

    return () => {
      ativo = false
    }
  }, [tentativa])

  /** Permite que o usuario tente carregar de novo depois de um erro. */
  const recarregar = useCallback(() => setTentativa((valor) => valor + 1), [])

  return { produtos, carregando, erro, recarregar }
}
