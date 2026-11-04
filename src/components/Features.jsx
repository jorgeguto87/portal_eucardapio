import { FeatureGrid } from './blocks'
import { Section, SectionTitle } from './ui'

export default function Features() {
  return (
    <Section className="bg-paper-dim/50">
      <SectionTitle eyebrow="Funcionalidades" title="Tudo o que o seu restaurante precisa" desc="Um sistema só, com uma mensalidade fixa." />
      <FeatureGrid />
    </Section>
  )
}
