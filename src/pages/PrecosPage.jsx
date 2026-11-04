import { Helmet } from 'react-helmet-async'
import { ComparisonTable, FAQAccordion, faqSchema, PriceCard } from '../components/blocks'
import { FinalCta, PageHero, Section, SectionTitle } from '../components/ui'

const FAQ = [
  { q: 'Tem comissão por pedido ou taxa de adesão?', a: 'Não. Você paga só a mensalidade de R$ 129,90. A taxa da sua plataforma de pagamento (Mercado Pago, PagBank ou InfinitePay) é cobrada por ela, nas transações online.' },
  { q: 'O teste grátis tem alguma limitação?', a: 'Não. Nos 7 dias você usa todas as funcionalidades, sem cartão de crédito.' },
  { q: 'Tem limite de pedidos, produtos ou cupons?', a: 'Não há cobrança por pedido, produto ou cupom. O valor é o mesmo, venda o quanto vender.' },
  { q: 'Posso cancelar quando quiser?', a: 'Sim, sem multa.' },
  { q: 'Preciso deixar de vender nos marketplaces?', a: 'Não. Você pode usar o Eu Cardápio como o seu canal próprio, sem comissão, e manter os outros canais que quiser.' },
]

export default function PrecosPage() {
  return (
    <main>
      <Helmet><script type="application/ld+json">{JSON.stringify(faqSchema(FAQ))}</script></Helmet>
      <PageHero eyebrow="Preços" title="R$ 129,90 por mês. Sem comissão por pedido." subtitle="Um plano só, com tudo incluso. Teste 7 dias grátis, sem cartão de crédito." />
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-32 bg-hero" aria-hidden="true" />
        <div className="relative px-4 sm:px-8"><PriceCard /></div>
      </div>
      <Section>
        <SectionTitle eyebrow="Comparativo" title="Eu Cardápio × marketplaces" desc="Nos marketplaces, o custo cresce junto com as suas vendas. No Eu Cardápio, a mensalidade é fixa." />
        <div className="mx-auto max-w-4xl"><ComparisonTable /></div>
      </Section>
      <Section className="bg-white">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas sobre o plano" />
        <FAQAccordion items={FAQ} />
      </Section>
      <FinalCta />
    </main>
  )
}
