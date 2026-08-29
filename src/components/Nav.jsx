import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { PAINEL_URL } from '../lib/api'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSignup = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById('comecar')?.scrollIntoView({ behavior: 'smooth' }), 100)
      return
    }
    document.getElementById('comecar')?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinkClass = "text-xs sm:text-sm font-medium text-ink-soft hover:text-ink transition-colors px-1.5 sm:px-3 py-2 whitespace-nowrap"

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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-3 shrink-0">
          <div className="relative group">
            <button className={navLinkClass + " flex items-center gap-1"}>
              Funcionalidades
              <span className="text-[10px]">▾</span>
            </button>
            <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-xl shadow-xl border border-ink/10 py-2 w-56">
                <Link to="/funcionalidades" className="block px-4 py-2 text-sm text-ink-soft hover:bg-paper-dim hover:text-ink transition-colors">Detalhes</Link>
                <Link to="/cardapio-digital" className="block px-4 py-2 text-sm text-ink-soft hover:bg-paper-dim hover:text-ink transition-colors">Cardápio Digital</Link>
                <Link to="/pedido-whatsapp" className="block px-4 py-2 text-sm text-ink-soft hover:bg-paper-dim hover:text-ink transition-colors">Pedido pelo WhatsApp</Link>
                <Link to="/pagamento-online" className="block px-4 py-2 text-sm text-ink-soft hover:bg-paper-dim hover:text-ink transition-colors">Pagamento Online</Link>
                <Link to="/qr-code-mesa" className="block px-4 py-2 text-sm text-ink-soft hover:bg-paper-dim hover:text-ink transition-colors">QR Code na Mesa</Link>
                <Link to="/sistema-delivery" className="block px-4 py-2 text-sm text-ink-soft hover:bg-paper-dim hover:text-ink transition-colors">Sistema de Delivery</Link>
                <Link to="/cashback-fidelizacao" className="block px-4 py-2 text-sm text-ink-soft hover:bg-paper-dim hover:text-ink transition-colors">Cashback e Fidelização</Link>
              </div>
            </div>
          </div>
          <Link to="/precos" className={navLinkClass}>Preços</Link>
          <Link to="/sobre" className={navLinkClass}>Sobre</Link>
          <Link to="/blog" className={navLinkClass}>Blog</Link>
          <a
            href={PAINEL_URL}
            className="text-sm font-medium text-ink-soft hover:text-ink transition-colors px-3 py-2 whitespace-nowrap"
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

        {/* Mobile: menu button + CTA */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <a
            href="#comecar"
            onClick={scrollToSignup}
            className="inline-block text-xs font-semibold text-paper bg-ink hover:bg-ink-soft transition-colors rounded-full px-3 py-2 whitespace-nowrap"
          >
            Eu quero
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-ink"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M4 4l12 12M16 4L4 16" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-paper/95 backdrop-blur-md border-t border-ink/10 px-6 py-6 space-y-1">
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-widest uppercase text-ink-soft/50 mb-2 mt-2">Funcionalidades</p>
          <Link to="/funcionalidades" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">Detalhes</Link>
          <Link to="/cardapio-digital" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">Cardápio Digital</Link>
          <Link to="/pedido-whatsapp" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">Pedido pelo WhatsApp</Link>
          <Link to="/pagamento-online" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">Pagamento Online</Link>
          <Link to="/qr-code-mesa" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">QR Code na Mesa</Link>
          <Link to="/sistema-delivery" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">Sistema de Delivery</Link>
          <Link to="/cashback-fidelizacao" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">Cashback e Fidelização</Link>
          <div className="border-t border-ink/10 my-3" />
          <Link to="/precos" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">Preços</Link>
          <Link to="/sobre" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">Sobre</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">Blog</Link>
          <Link to="/contato" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-ink-soft hover:text-ink">Contato</Link>
          <a href={PAINEL_URL} className="block py-2 text-sm text-ink-soft hover:text-ink">Entrar no painel</a>
        </div>
      )}
    </header>
  )
}
