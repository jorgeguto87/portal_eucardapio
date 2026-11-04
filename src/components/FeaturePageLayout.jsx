import { Helmet } from 'react-helmet-async'
import { Check, X } from 'lucide-react'
import ArticleStrip from './ArticleStrip'
import PhoneChat from './PhoneChat'
import Visual from './Visual'
import { ScreenShot } from './ScreenShot'
import { FAQAccordion, faqSchema, FeatureGrid } from './blocks'
import { CtaButton, FinalCta, Icon, PageHero, Reveal, Section, SectionTitle, TrialBadge } from './ui'
import { getSeoForPath } from '../lib/seoConfig'


export default function FeaturePageLayout({ slug, c }) {
  const seo = getSeoForPath(`/${slug}`)
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://portal.eucardapio.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Funcionalidades', item: 'https://portal.eucardapio.com.br/funcionalidades' },
      { '@type': 'ListItem', position: 3, name: c.name, item: seo.canonical },
    ],
  }

  return (
    <main>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema(c.faq))}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
      </Helmet>

      <PageHero eyebrow={c.eyebrow} title={c.h1} subtitle={c.subtitle}>
        <div className="mt-8 flex justify-center"><CtaButton /></div>
        <div className="mt-6 flex justify-center"><TrialBadge dark className="justify-center" /></div>
      </PageHero>

      {/* Visual principal, subindo sobre o fim do topo escuro */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-40 bg-hero" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-5xl px-4 pb-6 sm:px-8">
          <Visual v={c.hero} />
        </Reveal>
      </div>

      <Section className="pt-24 sm:pt-32">
        <SectionTitle eyebrow="Antes e depois" title={`Do jeito antigo para o jeito Eu Cardápio`} />
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-[24px] border border-ink/10 bg-paper-dim/60 p-7 sm:p-8">
            <h3 className="mb-5 font-[family-name:var(--font-sans)] text-lg font-bold tracking-tight">Sem o Eu Cardápio</h3>
            <ul className="space-y-3">
              {c.problems.map((p) => (
                <li key={p} className="flex gap-3 text-ink-soft/80"><X className="mt-0.5 h-5 w-5 shrink-0 text-red-500/70" aria-hidden="true" />{p}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-[24px] bg-hero p-7 text-paper shadow-glow sm:p-8">
            <h3 className="mb-5 font-[family-name:var(--font-sans)] text-lg font-bold tracking-tight">Com o Eu Cardápio</h3>
            <ul className="space-y-3">
              {c.solutions.map((p) => (
                <li key={p} className="flex gap-3 text-paper/85"><Check className="mt-0.5 h-5 w-5 shrink-0 text-ember-light" aria-hidden="true" />{p}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section dark className="overflow-hidden">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionTitle dark center={false} eyebrow="Como funciona" title="Passo a passo" />
            <ol className="space-y-4">
              {c.steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 90} className="glass flex gap-4 rounded-[22px] p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ember font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-sans)] font-bold tracking-tight">{s.title}</h3>
                    <p className="mt-1 text-sm text-paper/70">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="flex justify-center"><Visual v={c.stepsVisual} className="w-full" /></Reveal>
        </div>
      </Section>

      {c.extraChats && (
        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionTitle center={false} eyebrow="Mais situações" title={c.extraChats.title} desc={c.extraChats.desc} />
            <Reveal className="flex flex-wrap justify-center gap-6">
              {c.extraChats.items.map((conv, i) => <PhoneChat key={i} conversa={conv} />)}
            </Reveal>
          </div>
        </Section>
      )}

      {c.gallery && (
        <Section className="bg-white">
          <SectionTitle eyebrow="No painel" title="Tudo à vista" />
          <div className="grid gap-8 md:grid-cols-2">
            {c.gallery.map((g, i) => (
              <Reveal key={g.title} delay={i * 100}>
                <ScreenShot name={g.screen} show={g.show} alt={g.title} />
                <h3 className="mt-5 font-[family-name:var(--font-sans)] text-lg font-bold tracking-tight">{g.title}</h3>
                <p className="mt-1 text-ink-soft/75">{g.desc}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section className={c.extraChats || c.gallery ? 'bg-paper-dim/50' : ''}>
        <SectionTitle eyebrow="Benefícios" title={`${c.name}: o que você ganha`} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 70} className="rounded-[22px] border border-ink/10 bg-white p-6 shadow-soft">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-ember/10 text-ember-dark"><Icon name={b.icon} className="h-5 w-5" /></span>
              <h3 className="font-[family-name:var(--font-sans)] font-bold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">{b.desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" />
        <FAQAccordion items={c.faq} />
      </Section>

      <ArticleStrip keywords={c.blogKeywords} eyebrow="Do blog" title="Artigos relacionados" className="py-20" />

      <Section className="bg-paper-dim/50">
        <SectionTitle eyebrow="Veja também" title="Funcionalidades relacionadas" />
        <FeatureGrid only={c.related} />
      </Section>

      <FinalCta />
    </main>
  )
}
