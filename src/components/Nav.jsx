import { useEffect, useState } from 'react'
import { PAINEL_URL } from '../lib/api'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSignup = (e) => {
    e.preventDefault()
    document.getElementById('comecar')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md shadow-[0_1px_0_rgba(26,26,46,0.08)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#topo" className="flex items-center gap-2.5">
          <img src="/favicon.png" alt="" className="w-9 h-9 rounded-lg" />
          <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-ink tracking-tight">
            Eu Cardápio
          </span>
        </a>

        <div className="flex items-center gap-3 md:gap-5">
          <a
            href={PAINEL_URL}
            className="hidden sm:inline-block text-sm font-medium text-ink-soft hover:text-ink transition-colors px-3 py-2"
          >
            Entrar
          </a>
          <a
            href="#comecar"
            onClick={scrollToSignup}
            className="inline-block text-sm font-semibold text-paper bg-ink hover:bg-ink-soft transition-colors rounded-full px-5 py-2.5"
          >
            Comece grátis
          </a>
        </div>
      </nav>
    </header>
  )
}
