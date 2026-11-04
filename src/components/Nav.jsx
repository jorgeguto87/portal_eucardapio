import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { FEATURES, SITE } from '../content/site'
import { cn, Icon, Logo } from './ui'

// Todas as páginas começam com o topo escuro: o cabeçalho fica claro só depois de rolar.
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname, hash])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const light = scrolled || open
  const link = 'rounded-full px-3 py-2 text-sm font-medium transition hover:bg-current/5'

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', light ? 'border-b border-ink/10 bg-paper/90 text-ink backdrop-blur-xl' : 'text-paper')}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-8">
        <Link to="/" aria-label="Eu Cardápio — início" className="shrink-0">
          <Logo light={!light} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          <div className="group relative">
            <Link to="/funcionalidades" className={cn(link, 'inline-flex items-center gap-1')}>
              Funcionalidades <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" aria-hidden="true" />
            </Link>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="w-[680px] rounded-[22px] border border-ink/10 bg-white p-3 text-ink shadow-soft">
                <div className="grid grid-cols-2 gap-1">
                  {FEATURES.map((f) => (
                    <Link key={f.slug} to={`/${f.slug}`} className="flex gap-3 rounded-2xl p-3 transition hover:bg-paper">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ember/10 text-ember-dark"><Icon name={f.icon} className="h-5 w-5" /></span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{f.title}</span>
                        <span className="block text-xs leading-snug text-ink-soft/70">{f.short}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link to="/funcionalidades" className="mt-2 block rounded-2xl bg-paper p-3 text-center text-sm font-semibold text-ember-dark">Ver todas as funcionalidades →</Link>
              </div>
            </div>
          </div>
          <Link to="/precos" className={link}>Preços</Link>
          <Link to="/sobre" className={link}>Sobre</Link>
          <a href="/blog" className={link}>Blog</a>
          <Link to="/contato" className={link}>Contato</Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={SITE.painelUrl} className={link + ' font-semibold'}>Entrar</a>
          <Link to={SITE.signupHref} className="rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-ember-dark">Testar grátis</Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Link to={SITE.signupHref} className="whitespace-nowrap rounded-full bg-ember px-3.5 py-2 text-xs font-semibold text-white">Testar grátis</Link>
          <button type="button" onClick={() => setOpen((o) => !o)} className="rounded-full p-2" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper px-4 pb-10 pt-2 text-ink lg:hidden">
          <p className="eyebrow mt-4 text-ink-soft/60">Funcionalidades</p>
          <div className="mt-2 grid gap-1">
            {FEATURES.map((f) => (
              <Link key={f.slug} to={`/${f.slug}`} className="flex items-center gap-3 rounded-2xl p-2.5 hover:bg-white">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ember/10 text-ember-dark"><Icon name={f.icon} className="h-5 w-5" /></span>
                <span className="text-sm font-semibold">{f.title}</span>
              </Link>
            ))}
            <Link to="/funcionalidades" className="p-2.5 text-sm font-semibold text-ember-dark">Ver todas →</Link>
          </div>
          <div className="mt-4 border-t border-ink/10">
            {[['/precos', 'Preços'], ['/sobre', 'Sobre'], ['/contato', 'Contato']].map(([to, t]) => (
              <Link key={to} to={to} className="block border-b border-ink/10 py-3.5 font-semibold">{t}</Link>
            ))}
            <a href="/blog" className="block border-b border-ink/10 py-3.5 font-semibold">Blog</a>
          </div>
          <div className="mt-6 grid gap-3">
            <Link to={SITE.signupHref} className="rounded-full bg-ember py-3.5 text-center font-semibold text-white">Começar {SITE.trialDays} dias grátis</Link>
            <a href={SITE.painelUrl} className="rounded-full border border-ink/15 py-3.5 text-center font-semibold">Entrar no painel</a>
          </div>
        </div>
      )}
    </header>
  )
}
