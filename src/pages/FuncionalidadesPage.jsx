import HowItWorks, { DeliverySection, PainelShowcase } from '../components/HowItWorks'
import { FeatureGrid } from '../components/blocks'
import { CtaButton, FinalCta, PageHero, Section, TrialBadge } from '../components/ui'

export default function FuncionalidadesPage() {
  return (
    <main>
      <PageHero eyebrow="Funcionalidades" title="Tudo para vender no delivery, na mesa e no balcão" subtitle="Cardápio digital, WhatsApp automático, pagamento online, entregas, impressão e fidelização no mesmo sistema.">
        <div className="mt-8 flex justify-center"><CtaButton /></div>
        <div className="mt-6 flex justify-center"><TrialBadge dark className="justify-center" /></div>
      </PageHero>
      <Section><FeatureGrid /></Section>
      <HowItWorks />
      <PainelShowcase />
      <DeliverySection />
      <FinalCta />
    </main>
  )
}
