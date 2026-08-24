import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

const RECEIPT_LINES = [
  { label: 'Cardápio digital', value: 'seu' },
  { label: 'WhatsApp automático', value: 'seu' },
  { label: 'Pagamento online', value: 'direto na conta' },
  { label: 'Comissão por pedido', value: 'R$ 0,00', highlight: true },
]

export default function Hero() {
  const scope = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.5 })
        .from('.hero-word', { opacity: 0, y: 28, stagger: 0.06, duration: 0.7 }, '-=0.2')
        .from('.hero-sub', { opacity: 0, y: 16, duration: 0.6 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 12, duration: 0.5 }, '-=0.35')
        .from('.hero-chips > span', { opacity: 0, y: 10, stagger: 0.08, duration: 0.4 }, '-=0.25')
        .from('.receipt', { opacity: 0, y: 24, rotate: -1.5, duration: 0.6 }, '-=0.5')
        .from('.receipt-line', {
          opacity: 0,
          x: -8,
          stagger: 0.18,
          duration: 0.4,
        }, '-=0.2')
        .from('.receipt-total', { opacity: 0, duration: 0.4 }, '-=0.1')

      // Linha pontilhada "enchendo" — efeito de nota fiscal sendo preenchida
      gsap.utils.toArray('.dot-leader').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power1.inOut', delay: 1.1 + Math.random() * 0.4 })
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  const scrollToSignup = (e) => {
    e.preventDefault()
    document.getElementById('comecar')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="topo" ref={scope} className="relative pt-36 pb-24 md:pt-44 md:pb-32 px-6 md:px-10 overflow-hidden">
      {/* Textura de fundo sutil — pontos, tipo papel térmico */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #1A1A2E 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      />

      <div className="max-w-6xl mx-auto relative grid md:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <div>
          <p className="hero-eyebrow font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase text-ember-dark mb-5">
            Cardápio digital para restaurantes
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,7.5vw,3.75rem)] leading-[1.1] font-semibold text-ink tracking-tight mb-6">
            {'O cardápio é seu.'.split(' ').map((w, i) => (
              <span key={i} className="hero-word inline-block mr-[0.28em]">{w}</span>
            ))}
            <br />
            {'O cliente é seu.'.split(' ').map((w, i) => (
              <span key={`b${i}`} className="hero-word inline-block mr-[0.28em]">{w}</span>
            ))}
            <br />
            <span className="text-ember">
              {'O dinheiro é seu.'.split(' ').map((w, i) => (
                <span key={`c${i}`} className="hero-word inline-block mr-[0.28em]">{w}</span>
              ))}
            </span>
          </h1>

          <p className="hero-sub text-lg md:text-xl text-ink-soft max-w-lg mb-9 leading-relaxed">
            Seu restaurante recebe pedidos pelo WhatsApp, com cardápio próprio e pagamento caindo
            direto na sua conta — sem comissão por pedido, sem intermediário segurando seu dinheiro.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <a
              href="#comecar"
              onClick={scrollToSignup}
              className="inline-flex items-center gap-2 bg-ink text-paper font-semibold text-base rounded-full px-7 py-4 hover:bg-ink-soft transition-colors"
            >
              Comece grátis por 7 dias
            </a>
            <Link
              to="/funcionalidades"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-ember-dark transition-colors"
            >
              Veja como funciona →
            </Link>
          </div>
          <p className="hero-cta text-sm text-ink-soft/70 -mt-6 mb-8">Sem cartão de crédito pra testar</p>

          <div className="hero-chips flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-ink/10 px-4 py-2 text-sm font-medium text-ink-soft shadow-sm">
              🍽️ Delivery e mesa
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-ink/10 px-4 py-2 text-sm font-medium text-ink-soft shadow-sm">
              🎟️ Cupons sob medida
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-ink/10 px-4 py-2 text-sm font-medium text-ink-soft shadow-sm">
              💰 Cashback automático
            </span>
          </div>
        </div>

        {/* A comanda — elemento de assinatura da página */}
        <div className="receipt relative bg-white rounded-sm shadow-[0_20px_60px_-15px_rgba(26,26,46,0.25)] px-5 sm:px-7 py-8 w-full max-w-sm mx-auto md:mx-0 md:justify-self-end"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 98%, 96% 100%, 92% 98%, 88% 100%, 84% 98%, 80% 100%, 76% 98%, 72% 100%, 68% 98%, 64% 100%, 60% 98%, 56% 100%, 52% 98%, 48% 100%, 44% 98%, 40% 100%, 36% 98%, 32% 100%, 28% 98%, 24% 100%, 20% 98%, 16% 100%, 12% 98%, 8% 100%, 4% 98%, 0 100%)' }}
        >
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-widest text-ink-soft/60 mb-1">COMANDA Nº 001</p>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-ink-soft/60 mb-6">Eu Cardápio · pedido de teste</p>

          <div className="space-y-4">
            {RECEIPT_LINES.map((line) => (
              <div key={line.label} className="receipt-line flex items-baseline gap-1.5 sm:gap-2">
                <span className={`font-[family-name:var(--font-mono)] text-[clamp(10.5px,3vw,13px)] whitespace-nowrap ${line.highlight ? 'text-ember-dark font-semibold' : 'text-ink-soft'}`}>
                  {line.label}
                </span>
                <span className="dot-leader flex-1 border-b border-dotted border-ink-soft/30 origin-left" style={{ transform: 'scaleX(0)' }} />
                <span className={`font-[family-name:var(--font-mono)] text-[clamp(10.5px,3vw,13px)] whitespace-nowrap ${line.highlight ? 'text-ember-dark font-bold' : 'text-ink font-medium'}`}>
                  {line.value}
                </span>
              </div>
            ))}
          </div>

          <div className="receipt-total mt-7 pt-5 border-t-2 border-dashed border-ink-soft/20 flex items-baseline justify-between">
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-ink-soft/60">Total</span>
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-cash">liberdade</span>
          </div>
        </div>
      </div>
    </section>
  )
}
