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
 * Depois, por alguns segundos, mantém a seção no lugar se algo acima dela
 * mudar de tamanho (ex.: os "Últimos artigos" carregando em cima do
 * formulário). Para de corrigir assim que a pessoa rola, toca ou usa o teclado.
 */
const VIGIA_MS = 4000

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let timer
    let stopTimer
    let observer
    let parar = false

    const pararVigia = () => {
      parar = true
      observer?.disconnect()
      clearTimeout(stopTimer)
      for (const ev of ['wheel', 'touchstart', 'keydown', 'mousedown']) window.removeEventListener(ev, pararVigia)
    }

    const vigiar = (el) => {
      for (const ev of ['wheel', 'touchstart', 'keydown', 'mousedown']) window.addEventListener(ev, pararVigia, { passive: true })
      stopTimer = setTimeout(pararVigia, VIGIA_MS)
      if (typeof ResizeObserver === 'undefined') return
      // Qualquer mudança de altura da página reposiciona a seção (sem animação, para não "pular").
      observer = new ResizeObserver(() => { if (!parar) el.scrollIntoView({ behavior: 'auto' }) })
      observer.observe(document.body)
    }

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        vigiar(el)
        return
      }
      if (++tries < 20) timer = setTimeout(tryScroll, 100)
    }
    tryScroll()
    return () => { clearTimeout(timer); pararVigia() }
  }, [pathname, hash])

  return null
}
