import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    n: '01',
    title: 'O cliente chama no WhatsApp',
    body: 'Ele manda mensagem pro seu número, e o atendimento automático já mostra o cardápio — sem precisar baixar nenhum app.',
  },
  {
    n: '02',
    title: 'Escolhe, monta o pedido e paga',
    body: 'Cardápio com opcionais, adicionais e fotos. O pagamento (Pix ou cartão) acontece na hora — e cai direto na sua conta, não na nossa.',
  },
  {
    n: '03',
    title: 'O pedido cai no seu painel',
    body: 'Já pago, já confirmado. Sua cozinha só precisa clicar em "Iniciar preparo" — sem anotar nada, sem ligar pra ninguém confirmar.',
  },
  {
    n: '04',
    title: 'A entrega sai organizada',
    body: 'Atribui pro entregador, acompanha a fila, e o cliente recebe cada atualização direto no WhatsApp — do preparo à porta da casa dele.',
  },
]

export default function HowItWorks() {
  const scope = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.progress-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.steps-wrap',
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: 0.5,
        },
      })

      gsap.utils.toArray('.step-item').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -24,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 78%' },
        })
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={scope} className="py-24 md:py-32 px-6 md:px-10 bg-paper-dim">
      <div className="max-w-4xl mx-auto">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase text-ember-dark mb-4">
          Do pedido à entrega
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.7rem,6vw,3rem)] font-semibold text-ink tracking-tight mb-16 max-w-xl">
          Quatro passos, e nenhum deles é manual
        </h2>

        <div className="steps-wrap relative pl-12 md:pl-16">
          {/* Trilho da linha de progresso */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-ink/10" />
          <div className="progress-fill absolute left-0 top-2 bottom-2 w-px bg-ember origin-top" style={{ transform: 'scaleY(0)' }} />

          <div className="space-y-16">
            {STEPS.map((step) => (
              <div key={step.n} className="step-item relative">
                <span className="absolute -left-12 md:-left-16 top-0 w-8 flex justify-center font-[family-name:var(--font-mono)] text-xs text-ink-soft/50">
                  {step.n}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-ink-soft leading-relaxed max-w-lg">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
