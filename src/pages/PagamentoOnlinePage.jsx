import FeaturePageLayout from '../components/FeaturePageLayout'

const SITE_URL = 'https://portal.eucardapio.com.br'

const seo = {
  title: 'Pagamento Online sem Intermediário — Pix e Cartão na Sua Conta | Eu Cardápio',
  description: 'Receba pagamentos por Pix e cartão direto na sua conta bancária. Sem comissão por venda, sem prazo de repasse, sem intermediário segurando seu dinheiro. Teste grátis.',
  canonical: `${SITE_URL}/pagamento-online`,
}

const hero = {
  eyebrow: 'Pagamento Online',
  title: 'O dinheiro do seu pedido é seu — literalmente',
  subtitle: 'O cliente paga por Pix ou cartão, e o valor cai direto na sua conta bancária. Sem intermediário, sem prazo de repasse, sem comissão por venda.',
}

const painPoints = {
  title: 'Os apps de delivery seguram seu dinheiro',
  items: [
    { title: 'Repasse demorado', body: 'Você vende hoje, mas o dinheiro só cai na sua conta depois de 7, 15, às vezes 30 dias. Enquanto isso, as contas não esperam.' },
    { title: 'Comissão por pedido', body: 'Cada venda tem 12%, 18%, às vezes 27% descontados. Vendeu mais, pagou mais. O app ganha, você não.' },
    { title: 'Sem controle do dinheiro', body: 'Você não decide quando sacar, não escolhe a taxa, não negocia. As regras mudam e você descobre depois.' },
    { title: 'Taxa escondida', body: 'Taxa de entrega, taxa de serviço, taxa de repasse antecipado. No fim, o que entra é bem menos do que parecia.' },
  ],
}

const solution = {
  tag: 'a solução',
  title: 'Pagamento direto, sem ninguém no meio',
  body: 'Você conecta sua própria conta do Mercado Pago ou InfinitePay. O cliente paga, e o valor vai direto pra essa conta — o Eu Cardápio nunca toca no seu dinheiro.',
  items: [
    'Pix e cartão na mesma tela',
    'Dinheiro cai na sua conta, não na nossa',
    'Sem comissão por venda',
    'Sem prazo de repasse — é instantâneo',
    'Você escolhe a plataforma de pagamento',
    'Relatório de cada transação no painel',
  ],
}

const benefits = {
  title: 'Por que pagamento direto muda tudo',
  items: [
    { icon: '💰', title: 'Dinheiro na hora', body: 'O cliente paga e o valor já está na sua conta. Sem esperar repasse, sem ficar de olho no calendário.' },
    { icon: '🔒', title: 'Sem intermediário', body: 'O Eu Cardápio não fica com seu dinheiro em nenhum momento. A transação é entre o cliente e a sua conta.' },
    { icon: '📊', title: 'Relatório claro', body: 'Cada transação aparece no painel: valor, forma de pagamento, horário. Sem decifrar planilha.' },
    { icon: '🔄', title: 'Principais Bancos Digitais', body: 'Mercado Pago ou InfinitePay — você escolhe a que tem a melhor taxa pra você. E pode trocar quando quiser.' },
    { icon: '⚡', title: 'Pix instantâneo', body: 'Pix cai na hora, sem espera. O cliente paga e o pedido já está liberado pra cozinha.' },
    { icon: '🏷️', title: 'Custo fixo', body: 'Você paga a assinatura do Eu Cardápio (R$ 79,90/mês) e a taxa da sua plataforma de pagamento. Sem surpresa.' },
  ],
}

const steps = {
  title: 'Como o pagamento funciona',
  items: [
    { title: 'Conecte sua conta', body: 'Vincule sua conta do Mercado Pago ou InfinitePay no painel. Leva dois minutos.' },
    { title: 'Cliente paga no pedido', body: 'No final do pedido, o cliente escolhe Pix ou cartão e paga sem sair do WhatsApp.' },
    { title: 'Dinheiro cai na sua conta', body: 'O valor vai direto pra sua conta vinculada. O pedido é liberado automaticamente e cai na cozinha.' },
  ],
}

const faq = [
  { q: 'O Eu Cardápio fica com meu dinheiro em algum momento?', a: 'Não. O pagamento é processado diretamente pela plataforma que você escolher (Mercado Pago ou InfinitePay). O dinheiro vai da conta do cliente direto pra sua conta, sem passar pelo Eu Cardápio.' },
  { q: 'Quais plataformas de pagamento estão disponíveis?', a: 'Atualmente Mercado Pago ou InfinitePay. Estamos adicionando mais opções. Você escolhe a que preferir e pode trocar quando quiser.' },
  { q: 'Qual a taxa que pago por transação?', a: 'A taxa é da plataforma de pagamento que você escolher, não do Eu Cardápio. Por exemplo, o Pix no Mercado Pago tem taxa reduzida. Você escolhe a mais vantajosa pra você.' },
  { q: 'Em quanto tempo o dinheiro cai na minha conta?', a: 'Pix é instantâneo. Cartão depende da plataforma, mas geralmente é D+1 ou D+2. Em todos os casos, o dinheiro vai direto pra sua conta, sem repasse do Eu Cardápio.' },
  { q: 'Preciso de máquina de cartão?', a: 'Não. O pagamento é online — Pix ou cartão pelo link de pagamento. Mas se você quiser usar máquina de cartão na entrega, o sistema registra isso também.' },
]

export default function PagamentoOnlinePage() {
  return (
    <FeaturePageLayout
      seo={seo}
      hero={hero}
      painPoints={painPoints}
      solution={solution}
      benefits={benefits}
      steps={steps}
      faq={faq}
    />
  )
}
