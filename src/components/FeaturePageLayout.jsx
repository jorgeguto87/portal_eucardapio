import { useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturePageLayout({ seo, hero, painPoints, solution, benefits, steps, faq }) {
  const scope = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fp-hero > *', { opacity: 0, y: 24, stagger: 0.1, duration: 0.7 })
      gsap.utils.toArray('.fp-section').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
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

  const faqSchema = faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null

  return (
    <div ref={scope} className="pt-28 pb-24">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      {/* Hero */}
      <section className="fp-hero mx-auto max-w-4xl px-6 text-center md:px-10">
        <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.2em] text-ember-dark">
          {hero.eyebrow}
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.7rem,6.5vw,3rem)] font-semibold leading-tight text-ink">
          {hero.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-ink-soft/80 sm:text-lg">
          {hero.subtitle}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
            Ver todas as funcionalidades →
          </Link>
        </div>
        <p className="mt-4 text-sm text-ink-soft/70">Sem cartão de crédito pra testar</p>
      </section>

      {/* Pain points */}
      {painPoints && (
        <section className="fp-section mx-auto mt-24 max-w-4xl px-6 md:px-10">
          <div className="rounded-2xl bg-paper-dim p-8 md:p-12">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.3rem,5vw,2rem)] font-semibold text-ink mb-8 max-w-xl">
              {painPoints.title}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {painPoints.items.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-bold text-lg">
                    ✕
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">{item.title}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solution */}
      {solution && (
        <section className="fp-section mx-auto mt-24 max-w-5xl px-6 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.15em] text-ember-dark">
                {solution.tag}
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.25rem,5vw,1.875rem)] font-semibold leading-tight text-ink">
                {solution.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft/80">{solution.body}</p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-xl">
              <ul className="space-y-4">
                {solution.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-ember/10 flex items-center justify-center text-ember-dark font-bold text-sm">
                      ✓
                    </span>
                    <span className="text-sm text-ink-soft leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {benefits && (
        <section className="fp-section mx-auto mt-24 max-w-5xl px-6 md:px-10">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.3rem,5vw,2rem)] font-semibold text-ink mb-12 text-center max-w-xl mx-auto">
            {benefits.title}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.items.map((item, i) => (
              <div key={i} className="rounded-2xl bg-paper-dim p-8 hover:bg-white transition-colors">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Steps */}
      {steps && (
        <section className="fp-section mx-auto mt-24 max-w-4xl px-6 md:px-10">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.3rem,5vw,2rem)] font-semibold text-ink mb-12 text-center max-w-xl mx-auto">
            {steps.title}
          </h2>
          <div className="space-y-8">
            {steps.items.map((step, i) => (
              <div key={i} className="flex gap-6">
                <span className="shrink-0 w-12 h-12 rounded-full bg-ink text-paper font-[family-name:var(--font-mono)] font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-2">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed max-w-lg">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq && (
        <section className="fp-section mx-auto mt-24 max-w-3xl px-6 md:px-10">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.3rem,5vw,2rem)] font-semibold text-ink mb-8 text-center">
            Perguntas frequentes
          </h2>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <details key={i} className="group rounded-xl bg-white border border-ink/10 px-6 py-4">
                <summary className="cursor-pointer font-semibold text-ink flex items-center justify-between list-none">
                  {item.q}
                  <span className="text-ember-dark text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="fp-section mx-auto mt-24 max-w-2xl px-6 text-center md:px-10">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          Seu restaurante merece isso.
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
