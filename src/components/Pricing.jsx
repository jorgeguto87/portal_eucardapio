import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INCLUI = [
  'Cardápio digital ilimitado',
  'Pedido por delivery e também na mesa (QR Code)',
  'Atendimento automático no WhatsApp',
  'Pagamento online (Pix e cartão)',
  'Cupons e cashback pra fidelizar cliente',
  'Painel de pedidos e financeiro',
  'Gestão de equipe e entregadores',
  'Suporte por WhatsApp',
]

export default function Pricing() {
  const scope = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.price-card', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.price-card', start: 'top 80%' },
      })
      gsap.from('.inclui-item', {
        opacity: 0,
        x: -10,
        stagger: 0.06,
        duration: 0.4,
        scrollTrigger: { trigger: '.price-card', start: 'top 70%' },
      })
    }, scope)
    return () => ctx.revert()
  }, [])

  const scrollToSignup = (e) => {
    e.preventDefault()
    document.getElementById('comecar')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={scope} className="py-24 md:py-32 px-6 md:px-10 bg-ink text-paper">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase text-ember-light mb-4">
          O item mais simples do nosso cardápio
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.7rem,6vw,3rem)] font-semibold tracking-tight mb-16">
          Um preço só. Sem pegadinha.
        </h2>

        <div className="price-card bg-paper text-ink rounded-2xl p-8 md:p-10 text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pb-6 mb-6 border-b border-dashed border-ink/15">
            <span className="font-[family-name:var(--font-display)] text-[clamp(1.15rem,4.5vw,1.5rem)] font-semibold">
              Cardápio Digital Completo
            </span>
            <div className="text-right shrink-0">
              <span className="font-[family-name:var(--font-mono)] text-[clamp(1.5rem,6vw,2.25rem)] font-bold text-ember-dark">R$ 79,90</span>
              <span className="block text-xs text-ink-soft/60 mt-0.5">por mês</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {INCLUI.map((item) => (
              <li key={item} className="inclui-item flex items-center gap-3 text-sm text-ink-soft">
                <span className="w-1.5 h-1.5 rounded-full bg-ember shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#comecar"
            onClick={scrollToSignup}
            className="block text-center bg-ember hover:bg-ember-dark transition-colors text-white font-semibold rounded-full px-6 py-4"
          >
            Testar grátis por 7 dias
          </a>
          <p className="text-center text-xs text-ink-soft/60 mt-3">Cancela quando quiser, sem multa.</p>
        </div>
      </div>
    </section>
  )
}
