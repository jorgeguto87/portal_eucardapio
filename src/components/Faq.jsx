import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FAQ_ITEMS = [
  {
    q: 'O Eu Cardápio cobra comissão por pedido?',
    a: 'Não. A cobrança é uma assinatura mensal fixa (R$ 79,90) — vendeu mais, o custo continua o mesmo, diferente de aplicativo de entrega que cobra uma porcentagem de cada venda.',
  },
  {
    q: 'Meu cliente precisa instalar algum aplicativo?',
    a: 'Não. O pedido é feito pelo próprio WhatsApp do cliente — sem baixar nada, sem criar conta em outro app.',
  },
  {
    q: 'Como o pagamento cai na minha conta?',
    a: 'Você conecta sua própria conta do Mercado Pago, PagBank ou InfinitePay. O cliente paga (Pix, cartão, ou na entrega), e o valor vai direto pra essa conta — o Eu Cardápio nunca fica com o dinheiro no meio do caminho.',
  },
  {
    q: 'Dá pra usar QR Code na mesa, além do delivery?',
    a: 'Sim. O mesmo cardápio funciona pro salão — o cliente escaneia o QR Code na mesa, pede, e o pedido cai direto na cozinha, sem precisar de garçom pra anotar.',
  },
  {
    q: 'Existe teste grátis?',
    a: 'Sim, 7 dias grátis, sem precisar de cartão de crédito pra começar.',
  },
  {
    q: 'Funciona no celular?',
    a: 'Sim — tanto o cardápio que o cliente vê quanto o painel de gestão do restaurante funcionam direto no navegador do celular, sem precisar instalar nada.',
  },
]

export default function Faq() {
  const scope = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        opacity: 0,
        y: 20,
        stagger: 0.06,
        duration: 0.5,
        scrollTrigger: { trigger: scope.current, start: 'top 80%' },
      })
    }, scope)
    return () => ctx.revert()
  }, [])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <section ref={scope} className="py-20 md:py-28 px-6 md:px-10 bg-paper-dim">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.7rem,6vw,3rem)] font-semibold text-ink tracking-tight mb-12 text-center">
          Perguntas frequentes
        </h2>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={item.q} className="faq-item bg-paper rounded-2xl border border-ink/10 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-ink">{item.q}</span>
                <span className={`shrink-0 text-ember transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openIndex === i && (
                <p className="px-6 pb-5 text-ink-soft leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
