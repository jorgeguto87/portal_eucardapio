import { Link } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown, X } from 'lucide-react'
import { FEATURES, SITE } from '../content/site'
import { cn, CtaButton, Icon, Reveal } from './ui'

export function FAQAccordion({ items }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((f) => (
        <details key={f.q} className="group rounded-2xl border border-ink/10 bg-white px-5 shadow-soft open:pb-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-ember-dark transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="pb-4 text-base leading-relaxed text-ink-soft/80">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

export function FeatureGrid({ only, exclude, dark }) {
  const list = FEATURES.filter((f) => (!only || only.includes(f.slug)) && f.slug !== exclude)
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((f, i) => (
        <Reveal key={f.slug} delay={(i % 4) * 70}>
          <Link
            to={`/${f.slug}`}
            className={cn(
              'group flex h-full flex-col rounded-[24px] border p-6 transition duration-300 hover:-translate-y-1',
              dark ? 'glass hover:border-ember/50' : 'border-ink/10 bg-white shadow-soft hover:border-ember/40',
            )}
          >
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-ember/12 text-ember-dark transition group-hover:bg-ember group-hover:text-white">
              <Icon name={f.icon} className="h-6 w-6" />
            </span>
            <h3 className="font-[family-name:var(--font-sans)] text-lg font-bold tracking-tight">{f.title}</h3>
            <p className={cn('mt-2 flex-1 text-sm leading-relaxed', dark ? 'text-paper/70' : 'text-ink-soft/75')}>{f.short}</p>
            <span className={cn('mt-5 inline-flex items-center gap-1 text-sm font-semibold', dark ? 'text-ember-light' : 'text-ember-dark')}>
              Saiba mais <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

// Comparativo sem citar nenhuma empresa.
export const VS_MARKETPLACES = [
  { label: 'Comissão por pedido', a: 'Zero', b: 'Percentual de cada venda' },
  { label: 'Custo mensal', a: `${SITE.price} fixo`, b: 'Cresce junto com as vendas' },
  { label: 'Contato do cliente', a: 'Fica com você', b: 'Fica com a plataforma' },
  { label: 'Sua marca', a: 'Cardápio só seu, com link próprio', b: 'Lado a lado com concorrentes' },
  { label: 'Dinheiro das vendas', a: 'Direto na sua conta', b: 'Repasse no prazo da plataforma' },
  { label: 'Trazer o cliente de volta', a: 'Cashback, cupons e seu WhatsApp', b: 'Depende das regras da plataforma' },
  { label: 'Atendimento automático no seu WhatsApp', a: true, b: false },
]

export function ComparisonTable({ rows = VS_MARKETPLACES, aLabel = 'Eu Cardápio', bLabel = 'Marketplaces' }) {
  const cell = (v, mine) =>
    typeof v === 'boolean'
      ? (v ? <Check className={cn('mx-auto h-5 w-5', mine ? 'text-cash' : 'text-ink-soft/50')} aria-label="Sim" /> : <X className="mx-auto h-5 w-5 text-red-500/70" aria-label="Não" />)
      : v
  return (
    <>
      {/* Tabela no computador */}
      <div className="hidden overflow-hidden rounded-[24px] border border-ink/10 bg-white shadow-soft md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10">
              <th scope="col" className="p-4 text-left font-semibold text-ink-soft/70">Critério</th>
              <th scope="col" className="bg-ember/8 p-4 text-center text-base font-bold text-ember-dark">{aLabel}</th>
              <th scope="col" className="p-4 text-center text-base font-bold">{bLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-ink/10 last:border-0">
                <th scope="row" className="p-4 text-left font-medium">{r.label}</th>
                <td className="bg-ember/8 p-4 text-center font-semibold">{cell(r.a, true)}</td>
                <td className="p-4 text-center text-ink-soft/70">{cell(r.b, false)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Cartões no celular (sem rolagem lateral) */}
      <div className="space-y-3 md:hidden">
        {rows.map((r) => (
          <div key={r.label} className="rounded-2xl border border-ink/10 bg-white p-4 shadow-soft">
            <p className="text-sm font-semibold">{r.label}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-ember/8 p-3">
                <p className="eyebrow !text-[10px] text-ember-dark">{aLabel}</p>
                <p className="mt-1 font-semibold">{typeof r.a === 'boolean' ? (r.a ? 'Sim' : 'Não') : r.a}</p>
              </div>
              <div className="rounded-xl bg-paper-dim/60 p-3">
                <p className="eyebrow !text-[10px] text-ink-soft/60">{bLabel}</p>
                <p className="mt-1 text-ink-soft/80">{typeof r.b === 'boolean' ? (r.b ? 'Sim' : 'Não') : r.b}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const INCLUI = [
  'Cardápio digital com fotos, opcionais e adicionais',
  'Atendimento automático no WhatsApp',
  'Avisos automáticos de cada etapa do pedido',
  'Pagamento online (Pix e cartão) direto na sua conta',
  'Pix com chave e pagamento na entrega',
  'Pedidos de delivery, mesa (QR Code) e balcão',
  'Fila de entrega e entregadores pelo WhatsApp',
  'Impressão automática em até 3 impressoras',
  'Cupons e cashback',
  'Relatórios de faturamento',
  'Equipe com acesso ao painel',
  'Suporte pelo WhatsApp',
]

export function PriceCard({ className }) {
  return (
    <div className={cn('relative mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-soft md:grid-cols-[1fr_1.15fr]', className)}>
      <div className="bg-hero p-8 text-paper sm:p-10">
        <p className="eyebrow text-ember-light">Plano único</p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-5xl font-semibold sm:text-6xl">{SITE.price}</p>
        <p className="mt-1 text-paper/70">por mês, sem comissão por pedido</p>
        <p className="mt-6 inline-flex rounded-full bg-ember/20 px-3 py-1 text-sm font-semibold text-ember-light">{SITE.trialDays} dias grátis para testar</p>
        <div className="mt-8"><CtaButton className="w-full sm:w-auto" /></div>
        <p className="mt-4 text-sm text-paper/60">Sem cartão de crédito para testar. Cancele quando quiser.</p>
      </div>
      <div className="p-8 sm:p-10">
        <p className="font-semibold">Tudo incluso:</p>
        <ul className="mt-4 grid gap-2.5 text-sm text-ink-soft/85 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {INCLUI.map((t) => (
            <li key={t} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-cash" aria-hidden="true" />{t}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Steps({ items, dark }) {
  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 90} className={cn('rounded-[22px] p-6', dark ? 'glass' : 'border border-ink/10 bg-white shadow-soft')}>
          <span className={cn('font-[family-name:var(--font-display)] text-4xl font-semibold', dark ? 'text-ember-light' : 'text-ember')}>0{i + 1}</span>
          <h3 className="mt-3 font-[family-name:var(--font-sans)] font-bold tracking-tight">{s.title}</h3>
          <p className={cn('mt-2 text-sm leading-relaxed', dark ? 'text-paper/70' : 'text-ink-soft/75')}>{s.desc}</p>
        </Reveal>
      ))}
    </ol>
  )
}
