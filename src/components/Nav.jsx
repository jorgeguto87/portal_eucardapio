import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { PAINEL_URL } from '../lib/api'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // O formulário de cadastro só existe na home — se o clique vier de
  // outra página (ex: Funcionalidades), navega pra home primeiro e só
  // rola até o formulário depois que a página carregar.
  const scrollToSignup = (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById('comecar')?.scrollIntoView({ behavior: 'smooth' }), 100)
      return
    }
    document.getElementById('comecar')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md shadow-[0_1px_0_rgba(26,26,46,0.08)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 h-16 md:h-20 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          <img src="/favicon.png" alt="" className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg shrink-0" />
          <span className="font-[family-name:var(--font-display)] text-[clamp(0.95rem,4vw,1.5rem)] font-semibold text-ink tracking-tight whitespace-nowrap">
            Eu Cardápio
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3 md:gap-5 shrink-0">
          <Link
            to="/funcionalidades"
            className="text-xs sm:text-sm font-medium text-ink-soft hover:text-ink transition-colors px-1.5 sm:px-3 py-2 whitespace-nowrap"
          >
            Detalhes
          </Link>
          <a
            href={PAINEL_URL}
            className="hidden sm:inline-block text-sm font-medium text-ink-soft hover:text-ink transition-colors px-3 py-2 whitespace-nowrap"
          >
            Entrar
          </a>
          <a
            href="#comecar"
            onClick={scrollToSignup}
            className="inline-block text-xs sm:text-sm font-semibold text-paper bg-ink hover:bg-ink-soft transition-colors rounded-full px-3 sm:px-5 py-2 sm:py-2.5 whitespace-nowrap"
          >
            Eu quero
          </a>
        </div>
      </nav>
    </header>
  )
}
