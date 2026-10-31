import { useEffect, useState } from 'react'
import { buscarProdutoPorId } from '../services/api'

/**
 * Busca um unico produto pelo id (RF05).
 * "produto" fica null quando a API responde 404 (produto inexistente).
 */
export function useProduto(id) {
  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    let ativo = true

    async function carregar() {
      setCarregando(true)
      setErro(null)

      try {
        const encontrado = await buscarProdutoPorId(id)
        if (ativo) setProduto(encontrado)
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
  }, [id])

  return { produto, carregando, erro }
}
