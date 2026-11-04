import { ComparisonTable, PriceCard } from './blocks'
import { Section, SectionTitle } from './ui'

/** Comparativo (sem citar empresas) + preço. */
export default function Pricing() {
  return (
    <>
      <Section>
        <SectionTitle eyebrow="Comparativo" title="Eu Cardápio × marketplaces" desc="Use os dois se quiser. A diferença é quanto fica com você em cada venda." />
        <div className="mx-auto max-w-4xl"><ComparisonTable /></div>
      </Section>
      <Section className="bg-paper-dim/50" id="precos">
        <SectionTitle eyebrow="Preço" title="Um plano, tudo incluso" desc="Sem comissão por pedido e sem taxa de adesão." />
        <PriceCard />
      </Section>
    </>
  )
}
