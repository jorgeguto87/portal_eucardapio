import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * O React Router NÃO rola a página pro topo sozinho quando a rota muda —
 * é um comportamento conhecido dele, "por design". Sem isso, trocar de
 * Início pra Detalhes (ou voltar) mantém a mesma posição de rolagem da
 * página anterior, fazendo a nova página abrir "no meio", sem contexto.
 *
 * Quando a URL chega com âncora (ex.: /#comecar vindo do blog, que é uma
 * página do servidor), rola até a seção assim que ela for renderizada.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    let tries = 0
    let timer
    const tryScroll = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) return el.scrollIntoView({ behavior: 'smooth' })
      if (++tries < 20) timer = setTimeout(tryScroll, 100)
    }
    tryScroll()
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}
