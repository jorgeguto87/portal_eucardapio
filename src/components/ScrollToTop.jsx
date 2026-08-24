import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * O React Router NÃO rola a página pro topo sozinho quando a rota muda —
 * é um comportamento conhecido dele, "por design". Sem isso, trocar de
 * Início pra Detalhes (ou voltar) mantém a mesma posição de rolagem da
 * página anterior, fazendo a nova página abrir "no meio", sem contexto.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
