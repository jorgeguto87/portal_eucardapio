import { useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SITE_URL = 'https://portal.eucardapio.com.br'

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

const COMPARISON = [
  { feature: 'Comissão por pedido', eucardapio: 'R$ 0,00', ifood: '12% a 27%', competidor: '8% a 20%' },
  { feature: 'Cliente é seu', eucardapio: 'Sim', ifood: 'Não', competidor: 'Não' },
  { feature: 'Pagamento na sua conta', eucardapio: 'Direto', ifood: 'Repasse em D+7', competidor: 'Repasse em D+3' },
  { feature: 'Cardápio digital próprio', eucardapio: 'Sim', ifood: 'Não', competidor: 'Parcial' },
  { feature: 'WhatsApp automático', eucardapio: 'Sim', ifood: 'Não', competidor: 'Não' },
  { feature: 'QR Code na mesa', eucardapio: 'Sim', ifood: 'Não', competidor: 'Parcial' },
  { feature: 'Custo mensal fixo', eucardapio: 'R$ 79,90', ifood: 'Variável', competidor: 'Variável' },
]

export default function PrecosPage() {
  const scope = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.price-card', { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.price-card', start: 'top 80%' } })
      gsap.from('.inclui-item', { opacity: 0, x: -10, stagger: 0.06, duration: 0.4, scrollTrigger: { trigger: '.price-card', start: 'top 70%' } })
      gsap.from('.compare-row', { opacity: 0, y: 16, stagger: 0.05, duration: 0.4, scrollTrigger: { trigger: '.compare-table', start: 'top 75%' } })
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
        <title>Preços — R$ 79,90/mês, Sem Comissão por Pedido | Eu Cardápio</title>
        <meta name="description" content="Plano único: R$ 79,90 por mês. Cardápio digital, WhatsApp automático, pagamento online, QR Code na mesa, cupons e cashback. Sem comissão por venda. 7 dias grátis." />
        <link rel="canonical" href={`${SITE_URL}/precos`} />
      </Helmet>

      <section className="mx-auto max-w-2xl px-6 text-center md:px-10">
        <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.2em] text-ember-dark">
          Preços
        </span>
        <h1 className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-display)] text-[clamp(1.7rem,6.5vw,3rem)] font-semibold leading-tight text-ink">
          Um preço só. Sem pegadinha.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base text-ink-soft/80 sm:text-lg">
          Você paga uma assinatura fixa, não uma porcentagem de cada venda. Vendeu mais, o custo continua o mesmo.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-xl px-6 md:px-10">
        <div className="price-card bg-white rounded-2xl p-8 md:p-10 text-left shadow-[0_20px_60px_-20px_rgba(26,26,46,0.15)] border border-ink/10">
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
          <p className="text-center text-xs text-ink-soft/60 mt-3">Sem cartão de crédito. Cancela quando quiser, sem multa.</p>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-4xl px-6 md:px-10">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.3rem,5vw,2rem)] font-semibold text-ink mb-4 text-center">
          Como o Eu Cardápio se compara
        </h2>
        <p className="text-center text-sm text-ink-soft/70 mb-10 max-w-lg mx-auto">
          O custo de usar um app de delivery depende de quanto você vende. O Eu Cardápio não.
        </p>

        <div className="compare-table overflow-x-auto rounded-2xl border border-ink/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ink text-paper">
                <th className="text-left px-5 py-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest">Recurso</th>
                <th className="text-center px-5 py-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-ember-light">Eu Cardápio</th>
                <th className="text-center px-5 py-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest">App de delivery</th>
                <th className="text-center px-5 py-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest">Outros sistemas</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.feature} className={`compare-row ${i % 2 === 0 ? 'bg-paper' : 'bg-paper-dim'}`}>
                  <td className="text-left px-5 py-4 font-medium text-ink">{row.feature}</td>
                  <td className="text-center px-5 py-4 font-semibold text-cash">{row.eucardapio}</td>
                  <td className="text-center px-5 py-4 text-ink-soft/70">{row.ifood}</td>
                  <td className="text-center px-5 py-4 text-ink-soft/70">{row.competidor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-2xl px-6 text-center md:px-10">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          Pronto pra parar de pagar comissão?
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
