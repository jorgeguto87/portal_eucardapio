import { useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SITE_URL = 'https://portal.eucardapio.com.br'

const POSTS = [
  {
    slug: 'cardapio-digital-vs-ifood',
    title: 'Cardápio digital vs. iFood: o que muda no seu bolso',
    excerpt: 'Compare os custos reais de manter um cardápio digital próprio com os apps de delivery. Veja quanto você economiza por mês.',
    tag: 'Comparativo',
    date: '2026-08-20',
  },
  {
    slug: 'como-receber-pedido-pelo-whatsapp',
    title: 'Como receber pedido pelo WhatsApp sem perder o controle',
    excerpt: 'Atender pelo WhatsApp não escala — a menos que você automatize. Veja como organizar os pedidos sem caos.',
    tag: 'Tutorial',
    date: '2026-08-15',
  },
  {
    slug: 'cashback-para-restaurante',
    title: 'Cashback para restaurante: vale a pena investir em fidelização?',
    excerpt: 'Cliente novo custa caro. Cliente que volta é lucro. Entenda como o cashback digital pode aumentar sua receita.',
    tag: 'Estratégia',
    date: '2026-08-10',
  },
  {
    slug: 'qr-code-na-mesa-como-funciona',
    title: 'QR Code na mesa: como funciona e por que seus clientes vão se amarrar',
    excerpt: 'O garçom não dá conta no rush? O QR Code na mesa libera o cliente pra pedir sozinho e a cozinha recebe na hora.',
    tag: 'Tutorial',
    date: '2026-08-05',
  },
]

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const scope = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-hero > *', { opacity: 0, y: 24, stagger: 0.1, duration: 0.7 })
      gsap.utils.toArray('.post-card').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
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
        <title>Blog — Dicas para Restaurantes que Fazem Delivery | Eu Cardápio</title>
        <meta name="description" content="Dicas, tutoriais e estratégias para restaurantes que querem ter delivery próprio, receber pedido pelo WhatsApp e parar de pagar comissão." />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
      </Helmet>

      <section className="blog-hero mx-auto max-w-3xl px-6 text-center md:px-10">
        <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.2em] text-ember-dark">
          Blog
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.7rem,6.5vw,3rem)] font-semibold leading-tight text-ink">
          Dicas pra quem cozinha e vende por delivery
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base text-ink-soft/80 sm:text-lg">
          Estratégia, tecnologia e gestão pra restaurante independente. Sem enrolação, direto ao que importa.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-6 md:px-10">
        <div className="grid gap-6 sm:grid-cols-2">
          {POSTS.map((post) => (
            <article key={post.slug} className="post-card rounded-2xl bg-paper-dim p-7 hover:bg-white transition-colors border border-ink/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-ember-dark bg-ember/10 rounded-full px-2.5 py-1">
                  {post.tag}
                </span>
                <span className="text-xs text-ink-soft/60">{formatDate(post.date)}</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed mb-5">{post.excerpt}</p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm font-semibold text-ember-dark hover:text-ink transition-colors"
              >
                Ler artigo →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-2xl px-6 text-center md:px-10">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          Quer colocar isso em prática?
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
