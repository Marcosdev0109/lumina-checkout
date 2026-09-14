import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { todosDigitosIguais } from '../utils/pagamento'

/**
 * Custom hook que concentra o processamento da compra simulada (RF08 / RF09).
 *
 * Responsabilidades:
 * - controlar o estado "processando" para desabilitar o botao e evitar envios duplicados;
 * - simular uma operacao assincrona com Promise + async/await;
 * - encaminhar o usuario para /sucesso ou /falha conforme a regra do cartao.
 *
 * E chamado no nivel superior do componente Pagamento, respeitando as regras dos hooks.
 */
export function usePagamento() {
  const [processando, setProcessando] = useState(false)
  const navigate = useNavigate()

  const processarCompra = useCallback(
    async (dadosCartao) => {
      // Guarda extra: se ja existe uma compra em andamento, ignora o novo envio.
      if (processando) return

      setProcessando(true)

      try {
        // Simulacao da latencia de uma operadora de pagamento.
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (todosDigitosIguais(dadosCartao.numero)) {
          navigate('/falha')
          return
        }

        navigate('/sucesso')
      } finally {
        setProcessando(false)
      }
    },
    [processando, navigate]
  )

  return { processando, processarCompra }
}
