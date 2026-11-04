import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Visual from './Visual'
import { PhoneFrame, ScreenShot } from './ScreenShot'
import { cn, Icon, Reveal, Section, SectionTitle } from './ui'
import { CONVERSA_ENTREGADOR } from '../content/conversas'

const JORNADA = [
  { icon: 'MessageCircle', title: 'O cliente chama no WhatsApp', desc: 'O robô responde na hora com o menu e envia o link do seu cardápio digital.' },
  { icon: 'BookOpen', title: 'Monta o pedido no cardápio', desc: 'Fotos, opcionais e adicionais. Escolhe tudo sozinho, sem erro de anotação.' },
  { icon: 'Wallet', title: 'Paga do jeito que preferir', desc: 'Pix ou cartão online direto na sua conta, Pix com chave ou na entrega.' },
  { icon: 'BellRing', title: 'Acompanha pelo WhatsApp', desc: 'Recebe a confirmação e um aviso em cada etapa, até a entrega.' },
]

/** Jornada do cliente (escuro) + telas do cardápio. */
export default function HowItWorks() {
  return (
    <Section dark id="como-funciona" className="scroll-mt-16 overflow-hidden">
      <SectionTitle dark eyebrow="Como funciona" title="Do primeiro “oi” ao pedido entregue" desc="O cliente faz o pedido no seu cardápio digital, e o WhatsApp cuida do atendimento e dos avisos." />
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {JORNADA.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 90} className="glass relative rounded-[22px] p-6">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-ember-light">0{i + 1}</span>
              <Icon name={s.icon} className="h-6 w-6 text-paper/50" />
            </div>
            <h3 className="mt-3 font-[family-name:var(--font-sans)] font-bold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-paper/70">{s.desc}</p>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-16 flex flex-wrap items-start justify-center gap-6 sm:flex-nowrap">
        <PhoneFrame name="cardapio" alt="Cardápio digital no celular com banners, categorias e produtos" />
        <PhoneFrame name="checkout" alt="Finalização do pedido com endereço e formas de pagamento" className="sm:mt-16" />
      </Reveal>
    </Section>
  )
}

const TABS = [
  { key: 'pedidos', label: 'Pedidos', title: 'Quadro de pedidos', desc: 'Recebido, em preparo e em rota, com o tempo de cada pedido. Um clique muda o status e o cliente é avisado no WhatsApp.', screen: 'painel-pedidos', show: 'auto' },
  { key: 'detalhe', label: 'Detalhe', title: 'Tudo do pedido numa tela', desc: 'Itens, opcionais, adicionais, endereço, forma de pagamento, entregador e reimpressão.', screen: 'pedido-detalhe', show: 'desktop' },
  { key: 'relatorios', label: 'Relatórios', title: 'Faturamento sem planilha', desc: 'Por dia, semana, mês ou ano, separado por canal, forma de pagamento, produto e entregador.', screen: 'relatorios', show: 'auto' },
  { key: 'celular', label: 'No celular', title: 'O painel cabe no bolso', desc: 'Pedidos e faturamento do dia por canal, e o botão para lançar pedido de balcão.', screen: 'painel-inicio', show: 'mobile' },
]

/** Telas do painel em abas. */
export function PainelShowcase() {
  const [tab, setTab] = useState(TABS[0].key)
  const cur = TABS.find((t) => t.key === tab)
  return (
    <Section className="bg-white">
      <SectionTitle eyebrow="Do lado do restaurante" title="Um painel simples para a operação inteira" desc="Pedidos de delivery, mesa e balcão no mesmo lugar, no computador ou no celular." />
      <div role="tablist" aria-label="Telas do painel" className="no-scrollbar mx-auto mb-10 flex max-w-full justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">
        {TABS.map((t) => (
          <button
            key={t.key} role="tab" aria-selected={tab === t.key} aria-controls="painel-tab" type="button"
            onClick={() => setTab(t.key)}
            className={cn('shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition', tab === t.key ? 'bg-ink text-paper' : 'border border-ink/15 text-ink-soft hover:bg-paper')}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id="painel-tab" role="tabpanel" className="grid items-center gap-10 lg:grid-cols-[1fr_2fr]">
        <div key={cur.key + 't'} className="animate-msg lg:order-none">
          <h3 className="font-[family-name:var(--font-sans)] text-2xl font-bold tracking-tight">{cur.title}</h3>
          <p className="mt-3 text-lg text-ink-soft/80">{cur.desc}</p>
        </div>
        <div key={cur.key} className="animate-msg">
          <ScreenShot name={cur.screen} show={cur.show} alt={cur.title} />
        </div>
      </div>
    </Section>
  )
}

/** Entregas: fila no painel + conversa do entregador. */
export function DeliverySection() {
  const passos = [
    'Você monta a fila de cada entregador no painel e clica em "Enviar lista"',
    'O entregador recebe as entregas numeradas no WhatsApp e escolhe o pedido',
    'Vê cliente, endereço, referência, mapa e total',
    'Responde 1 para "próxima entrega" e 2 para "cheguei": o cliente é avisado na hora',
    'Responde 3 para "entregue" e o pedido é finalizado no painel',
  ]
  return (
    <Section className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionTitle center={false} eyebrow="Entregas sem confusão" title="O entregador trabalha pelo WhatsApp" desc="Sem aplicativo para instalar. A fila sai do painel e volta atualizada." />
          <ol className="space-y-3">
            {passos.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 70} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ember text-sm font-bold text-white">{i + 1}</span>
                <span className="pt-0.5 text-ink-soft/85">{p}</span>
              </Reveal>
            ))}
          </ol>
          <Link to="/sistema-delivery" className="mt-8 inline-flex items-center gap-1 font-semibold text-ember-dark">
            Ver o sistema de delivery <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <Reveal>
          <Visual v={{ desktop: 'fila-entrega-desktop', phone: { chat: CONVERSA_ENTREGADOR }, alt: 'Fila de entregas do entregador no painel', url: 'painel.eucardapio.com.br/orders' }} />
        </Reveal>
      </div>
    </Section>
  )
}

