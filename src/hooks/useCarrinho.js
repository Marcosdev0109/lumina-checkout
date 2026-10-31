import { useContext } from 'react'
import { CarrinhoContext } from '../contexts/CarrinhoContext'

/**
 * Custom hook para consumir o CarrinhoContext (RF06).
 * Avisa com um erro claro se for usado fora do CarrinhoProvider.
 */
export function useCarrinho() {
  const contexto = useContext(CarrinhoContext)

  if (!contexto) {
    throw new Error('useCarrinho precisa ser usado dentro de um CarrinhoProvider.')
  }

  return contexto
}
