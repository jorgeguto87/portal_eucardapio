import PhoneChat from './PhoneChat'
import { BrowserFrame } from './ScreenShot'
import { CtaButton, Icon, Reveal, Section } from './ui'
import { CONVERSA_CLIENTE } from '../content/conversas'
import { SITE } from '../content/site'

const PILLARS = [
  { icon: 'Percent', title: 'Zero comissão', desc: `Mensalidade fixa de ${SITE.price}, venda o quanto vender.` },
  { icon: 'MessageCircle', title: 'WhatsApp automático', desc: 'Atende, envia o cardápio e avisa cada etapa do pedido.' },
  { icon: 'Bike', title: 'Entregas no WhatsApp', desc: 'O entregador recebe a lista e atualiza o pedido por ali.' },
  { icon: 'Store', title: 'Delivery, mesa e balcão', desc: 'Tudo no mesmo painel, com impressão automática.' },
]

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero pb-20 pt-28 text-paper sm:pb-28 sm:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="glass eyebrow inline-block rounded-full px-4 py-1.5 text-ember-light">Delivery próprio para restaurantes</span>
            <h1 className="mt-6 text-[clamp(2.25rem,5.4vw,4.25rem)] font-semibold leading-[1.04]">
              Venda mais no delivery <span className="text-ember-light">sem pagar comissão</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-paper/75">
              Cardápio digital próprio, atendimento automático no WhatsApp e entregas organizadas. O cliente pede no seu cardápio e o dinheiro cai direto na sua conta.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton />
              <a href="#como-funciona" className="glass rounded-full px-7 py-4 font-semibold transition hover:bg-white/10">Ver como funciona</a>
            </div>
            <p className="mt-6 text-sm text-paper/65">{SITE.trialDays} dias grátis · sem cartão de crédito · {SITE.price}/mês depois</p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <BrowserFrame
              name="painel-pedidos" eager url="painel.eucardapio.com.br/orders"
              alt="Quadro de pedidos do painel do Eu Cardápio com pedidos recebidos, em preparo e em rota"
              className="absolute -left-10 top-10 hidden w-[620px] rotate-[-3deg] opacity-95 xl:block"
            />
            <PhoneChat conversa={CONVERSA_CLIENTE} className="animate-float relative xl:mr-4" />
          </div>
        </div>
      </section>

      <Section className="!pb-0 !pt-14 sm:!pt-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="rounded-[20px] border border-ink/10 bg-white p-4 shadow-soft sm:rounded-[24px] sm:p-6">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-ember/10 text-ember-dark"><Icon name={p.icon} className="h-5 w-5" /></span>
              <h2 className="font-[family-name:var(--font-sans)] text-base font-bold leading-snug tracking-tight sm:text-lg">{p.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft/75">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
