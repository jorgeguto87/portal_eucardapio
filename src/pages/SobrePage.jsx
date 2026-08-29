import { useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SITE_URL = 'https://portal.eucardapio.com.br'

const VALUES = [
  { icon: '🤝', title: 'O restaurante é dono do jogo', body: 'O cliente é seu, o dinheiro é seu, a regra é sua. Nada de intermediário decidindo como você trabalha.' },
  { icon: '💡', title: 'Simples de verdade', body: 'Se um dono de restaurante precisa de treinamento pra usar, falhamos. Tudo tem que ser óbvio.' },
  { icon: '🇧🇷', title: 'Feito pra comida brasileira', body: 'Opcionais de pizza, meio a meio, ponto da carne, borda recheada — o jeito que a gente pede.' },
]

export default function SobrePage() {
  const scope = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sobre-hero > *', { opacity: 0, y: 24, stagger: 0.1, duration: 0.7 })
      gsap.utils.toArray('.valor-card').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
      })
    }, scope)
    return () => ctx.revert()
  }, [])

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
    <div ref={scope} className="pt-28 pb-24">
      <Helmet>
        <title>Sobre o Eu Cardápio — Tecnologia pra Restaurante Independente</title>
        <meta name="description" content="O Eu Cardápio nasceu pra dar ao restaurante independente as ferramentas dos grandes, sem cobrar comissão por venda. Conheça nossa história e missão." />
        <link rel="canonical" href={`${SITE_URL}/sobre`} />
      </Helmet>

      <section className="sobre-hero mx-auto max-w-3xl px-6 text-center md:px-10">
        <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.2em] text-ember-dark">
          Sobre
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.7rem,6.5vw,3rem)] font-semibold leading-tight text-ink">
          A tecnologia dos grandes, pra quem trabalha por conta própria
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-ink-soft/80 sm:text-lg">
          O Eu Cardápio nasceu de uma observação simples: o restaurante independente paga caro pra ter as mesmas ferramentas das grandes redes — e mesmo assim não é dono do próprio cliente.
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-3xl px-6 md:px-10">
        <div className="space-y-6 text-base leading-relaxed text-ink-soft/80">
          <p>
            Todo restaurante que faz delivery conhece o dilema: sem o app de delivery, não tem pedido. Com o app, a comissão come o lucro e o cliente nunca é seu. O dono trabalha pra plataforma, não pra si.
          </p>
          <p>
            Foi pra resolver isso que criamos o Eu Cardápio. Um sistema que dá ao restaurante independente tudo que ele precisa pra receber pedidos — cardápio digital, WhatsApp automático, pagamento online, gestão de entrega — sem cobrar um centavo por venda. Uma assinatura fixa, e pronto.
          </p>
          <p>
            O dinheiro vai direto na conta do restaurante. O cliente pede pelo WhatsApp da loja, não pelo app. A regra de entrega, o cardápio, a promoção — tudo decidido por quem cozinha, não por quem faz o app.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-5xl px-6 md:px-10">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.3rem,5vw,2rem)] font-semibold text-ink mb-12 text-center">
          O que acreditamos
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="valor-card rounded-2xl bg-paper-dim p-8">
              <span className="text-3xl mb-4 block">{v.icon}</span>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink mb-2">{v.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-2xl px-6 text-center md:px-10">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          Quer fazer parte?
        </h3>
        <a
          href="#comecar"
          onClick={scrollToSignup}
          className="mt-6 inline-block rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ember-dark"
        >
          Comece grátis por 7 dias
        </a>
        <p className="mt-3 text-xs text-ink-soft/60">Sem cartão de crédito. Cancele quando quiser.</p>
      </section>
    </div>
  )
}
