import { Helmet } from 'react-helmet-async'
import { FAQAccordion, faqSchema } from './blocks'
import { Section, SectionTitle } from './ui'

export const HOME_FAQ = [
  { q: 'O Eu Cardápio cobra comissão por pedido?', a: 'Não. A cobrança é uma assinatura mensal fixa de R$ 129,90. Vendeu mais, o custo continua o mesmo.' },
  { q: 'Meu cliente precisa instalar algum aplicativo?', a: 'Não. O cliente chama no WhatsApp do restaurante, recebe o link e faz o pedido no cardápio digital, direto no navegador do celular.' },
  { q: 'O pedido é feito pelo WhatsApp?', a: 'O pedido é feito no cardápio digital. O WhatsApp faz o atendimento automático, envia o link do cardápio, confirma o pedido e avisa o cliente em cada etapa.' },
  { q: 'Como o pagamento cai na minha conta?', a: 'Você conecta a sua conta do Mercado Pago, PagBank ou InfinitePay. O cliente paga por Pix ou cartão e o valor vai direto para essa conta. Também dá para aceitar Pix com chave e pagamento na entrega.' },
  { q: 'Como funciona a entrega?', a: 'Você monta a fila de cada entregador no painel e envia a lista pelo WhatsApp. O entregador vê endereço e mapa, avisa "próxima entrega" e "cheguei" e marca "entregue", tudo pelo WhatsApp. O cliente é avisado automaticamente.' },
  { q: 'Dá para usar na mesa e no balcão?', a: 'Sim. O cliente da mesa pede pelo QR Code, e a equipe lança pedidos de balcão no painel. Tudo cai no mesmo lugar e pode sair impresso em até 3 impressoras.' },
  { q: 'Existe teste grátis?', a: 'Sim. São 7 dias grátis, sem cartão de crédito.' },
  { q: 'Funciona no celular?', a: 'Sim. O cardápio do cliente e o painel do restaurante funcionam no navegador do celular, sem instalar nada.' },
]

export default function Faq() {
  return (
    <Section className="bg-white">
      <Helmet><script type="application/ld+json">{JSON.stringify(faqSchema(HOME_FAQ))}</script></Helmet>
      <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" />
      <FAQAccordion items={HOME_FAQ} />
    </Section>
  )
}
