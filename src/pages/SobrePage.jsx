import { FinalCta, Icon, PageHero, Reveal, Section, SectionTitle } from '../components/ui'

const VALUES = [
  { icon: 'Store', title: 'O restaurante é dono do jogo', body: 'O cliente é seu, o dinheiro é seu, a regra é sua. Nada de intermediário decidindo como você trabalha.' },
  { icon: 'Sparkles', title: 'Simples de verdade', body: 'Se o dono do restaurante precisa de treinamento para usar, falhamos. Tudo tem que ser óbvio.' },
  { icon: 'UtensilsCrossed', title: 'Feito para a rotina da cozinha', body: 'Opcionais, adicionais, ponto da carne, troco, entregador: o jeito que o pedido acontece de verdade.' },
]

export default function SobrePage() {
  return (
    <main>
      <PageHero
        eyebrow="Sobre"
        title="A tecnologia dos grandes, para quem trabalha por conta própria"
        subtitle="O restaurante independente paga caro para ter as ferramentas das grandes redes e, mesmo assim, não é dono do próprio cliente. O Eu Cardápio existe para mudar isso."
      />
      <Section>
        <Reveal className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-ink-soft/85">
          <p>Todo restaurante que faz delivery conhece o dilema: sem os aplicativos, falta pedido. Com eles, a comissão come o lucro e o cliente nunca é seu.</p>
          <p>Foi para resolver isso que criamos o Eu Cardápio: cardápio digital, atendimento automático no WhatsApp, pagamento online, entregas e impressão, sem cobrar um centavo por venda. Uma assinatura fixa, e pronto.</p>
          <p>O dinheiro vai direto para a conta do restaurante. O cliente fala com o WhatsApp da loja e pede no cardápio da loja. O cardápio, a taxa de entrega e as promoções são decididos por quem cozinha.</p>
        </Reveal>
      </Section>
      <Section className="bg-white">
        <SectionTitle eyebrow="No que acreditamos" title="Três princípios" />
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 90} className="rounded-[24px] border border-ink/10 bg-paper p-8 shadow-soft">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-ember/10 text-ember-dark"><Icon name={v.icon} className="h-5 w-5" /></span>
              <h3 className="font-[family-name:var(--font-sans)] text-lg font-bold tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <FinalCta title="Quer fazer parte?" />
    </main>
  )
}
