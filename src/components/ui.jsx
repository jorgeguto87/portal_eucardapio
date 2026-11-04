import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Check, BookOpen, MessageCircle, Wallet, Bike, QrCode, Store, Printer, Gift, Clock, Percent, ShieldCheck,
  Users, Smartphone, BellRing, Zap, ChefHat, ClipboardList, Receipt, BarChart3, Link2, Image, ListChecks, MapPin, Send,
  Banknote, KeyRound, CreditCard, Repeat, Tag, Layers, Monitor, RotateCcw, UtensilsCrossed, Package, Sparkles, Moon,
  Headphones, LayoutDashboard, Ban, BadgePercent, CircleDollarSign, Timer, ScanLine, Settings2,
} from 'lucide-react'

const ICONS = {
  BookOpen, MessageCircle, Wallet, Bike, QrCode, Store, Printer, Gift, Clock, Percent, ShieldCheck, Users, Smartphone,
  BellRing, Zap, ChefHat, ClipboardList, Receipt, BarChart3, Link2, Image, ListChecks, MapPin, Send, Banknote, KeyRound,
  CreditCard, Repeat, Tag, Layers, Monitor, RotateCcw, UtensilsCrossed, Package, Sparkles, Moon, Headphones,
  LayoutDashboard, Ban, BadgePercent, CircleDollarSign, Timer, ScanLine, Settings2,
}
import { SITE } from '../content/site'

export const cn = (...c) => c.filter(Boolean).join(' ')

export function Logo({ light = false, className = '' }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <img src="/favicon.png" alt="" width="36" height="36" className="h-8 w-8 shrink-0 rounded-xl sm:h-9 sm:w-9" />
      <span className={cn('whitespace-nowrap font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight min-[400px]:text-xl sm:text-2xl', light ? 'text-paper' : 'text-ink')}>
        Eu Cardápio
      </span>
    </span>
  )
}

export function Icon({ name, className }) {
  const C = ICONS[name] || Sparkles
  return <C className={className} aria-hidden="true" />
}

/** Aparece suavemente quando entra na tela. */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { setVisible(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} data-visible={visible} className={cn('reveal', className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}

export function Section({ children, dark, className, id, inner = '' }) {
  return (
    <section id={id} className={cn('py-20 sm:py-28', dark ? 'bg-hero text-paper' : '', className)}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-8', inner)}>{children}</div>
    </section>
  )
}

export function SectionTitle({ eyebrow, title, desc, dark, center = true, as: H = 'h2' }) {
  return (
    <Reveal className={cn('mb-12 max-w-3xl', center && 'mx-auto text-center')}>
      {eyebrow && <span className={cn('eyebrow mb-3 inline-block', dark ? 'text-ember-light' : 'text-ember-dark')}>{eyebrow}</span>}
      <H className="text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[1.1]">{title}</H>
      {desc && <p className={cn('mt-4 text-lg', dark ? 'text-paper/70' : 'text-ink-soft/80')}>{desc}</p>}
    </Reveal>
  )
}

export function CtaButton({ children = `Começar ${SITE.trialDays} dias grátis`, className, size = 'lg' }) {
  return (
    <Link
      to={SITE.signupHref}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full bg-ember font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-ember-dark',
        size === 'lg' ? 'px-7 py-4 text-base' : 'px-5 py-2.5 text-sm',
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}

export function TrialBadge({ dark, className }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-5 gap-y-2 text-sm', dark ? 'text-paper/80' : 'text-ink-soft/80', className)}>
      {SITE.trialBadge.map((t) => (
        <li key={t} className="flex items-center gap-1.5">
          <Check className={cn('h-4 w-4', dark ? 'text-ember-light' : 'text-cash')} aria-hidden="true" /> {t}
        </li>
      ))}
    </ul>
  )
}

export function FinalCta({ title = 'Seu delivery próprio, sem comissão, a partir de hoje', desc = `Teste tudo por ${SITE.trialDays} dias grátis. Depois, ${SITE.price} por mês.` }) {
  return (
    <section className="px-4 py-20 sm:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-hero px-6 py-16 text-center text-paper shadow-glow sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ember/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-ember-light/20 blur-3xl" />
        <h2 className="relative mx-auto max-w-3xl text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-tight">{title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-paper/75">{desc}</p>
        <div className="relative mt-8 flex justify-center"><CtaButton /></div>
        <div className="relative mt-6 flex justify-center"><TrialBadge dark className="justify-center" /></div>
      </Reveal>
    </section>
  )
}

export function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-hero pb-20 pt-32 text-paper sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-8">
        {eyebrow && <span className="glass eyebrow mb-5 inline-block rounded-full px-4 py-1.5 text-ember-light">{eyebrow}</span>}
        <h1 className="text-[clamp(2rem,6vw,3.75rem)] font-semibold leading-[1.08]">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-paper/75">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
