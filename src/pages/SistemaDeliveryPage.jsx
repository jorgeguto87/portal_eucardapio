import FeaturePageLayout from '../components/FeaturePageLayout'

const SITE_URL = 'https://portal.eucardapio.com.br'

const seo = {
  title: 'Sistema de Delivery Próprio — Sem Comissão por Pedido | Eu Cardápio',
  description: 'Sistema completo de delivery para restaurantes: cardápio digital, pedido por WhatsApp, pagamento online, gestão de entregadores e painel financeiro. Tudo por R$ 79,90/mês.',
  canonical: `${SITE_URL}/sistema-delivery`,
}

const hero = {
  eyebrow: 'Sistema de Delivery',
  title: 'Seu próprio delivery, sem depender de app de terceiro',
  subtitle: 'Cardápio digital, pedido por WhatsApp, pagamento online, gestão de entregadores e painel financeiro — tudo num sistema só, por uma assinatura fixa.',
}

const painPoints = {
  title: 'Depender de app de delivery está te custando caro',
  items: [
    { title: 'Comissão que come o lucro', body: 'A cada pedido, 12% a 27% vai pro app. No fim do mês, você trabalhou pra pagar a plataforma, não pra lucrar.' },
    { title: 'Cliente não é seu', body: 'O cliente é do app. Ele não sabe seu nome, não volta direto, e você não consegue mandar promoção pra ele.' },
    { title: 'Regra não é sua', body: 'O app decide o raio de entrega, o tempo mínimo, a taxa. Você aceita ou perde o pedido — não tem negociação.' },
    { title: 'Avaliação te prejudica', body: 'Uma avaliação ruim de um cliente irritado por atraso do app e seu restaurante cai no ranking. Você paga pelo erro dos outros.' },
  ],
}

const solution = {
  tag: 'a solução',
  title: 'Um sistema de delivery que é seu',
  body: 'Com o Eu Cardápio, você tem seu próprio canal de pedidos. O cliente pede direto de você, paga direto pra você, e volta porque é sua marca — não a do app.',
  items: [
    'Cardápio digital com endereço próprio',
    'Pedido por WhatsApp, sem intermediário',
    'Pagamento direto na sua conta',
    'Gestão de entregadores integrada',
    'Painel financeiro completo',
    'Cupons e cashback pra fidelizar',
  ],
}

const benefits = {
  title: 'Por que ter delivery próprio',
  items: [
    { icon: '💸', title: 'Custo fixo', body: 'R$ 79,90 por mês, não importa quantos pedidos você receba. Vendeu 10 ou 1.000, o custo é o mesmo.' },
    { icon: '👥', title: 'Cliente é seu', body: 'O cliente pede pelo seu WhatsApp, vê sua marca, recebe suas promoções. Ele volta direto, não pelo app.' },
    { icon: '🚚', title: 'Entrega organizada', body: 'Atribua pedidos ao entregador, acompanhe a fila em tempo real, e o cliente recebe cada atualização no WhatsApp.' },
    { icon: '📈', title: 'Dados são seus', body: 'Você vê o que vende mais, quando vende, quem compra. Usa isso pra criar promoções que funcionam de verdade.' },
    { icon: '🎛️', title: 'Regras são suas', body: 'Você define o raio de entrega, a taxa, o horário, o cardápio. Ninguém muda as regras sem te avisar.' },
    { icon: '🔗', title: 'Funciona com o que você tem', body: 'Seus entregadores, seu WhatsApp, sua conta de pagamento. O sistema se adapta à sua operação, não o contrário.' },
  ],
}

const steps = {
  title: 'Montando seu delivery próprio',
  items: [
    { title: 'Configure seu cardápio', body: 'Cadastre produtos, preços, fotos e opcionais. Defina área de entrega, taxa e horário de funcionamento.' },
    { title: 'Compartilhe e receba pedidos', body: 'Divulgue o link do cardápio no WhatsApp, Instagram e panfletos. Pedidos chegam pelo WhatsApp, já pagos.' },
    { title: 'Gerencie a operação', body: 'Acompanhe pedidos, entregadores e faturamento no painel. Tudo numa tela, no computador ou no celular.' },
  ],
}

const faq = [
  { q: 'Preciso abandonar o iFood para usar o Eu Cardápio?', a: 'Não. Você pode usar os dois em paralelo. O Eu Cardápio é seu canal próprio — use-o para receber pedidos sem comissão, enquanto mantém o app como canal adicional.' },
  { q: 'Funciona para restaurante que nunca teve delivery?', a: 'Sim. O sistema é completo: cardápio, pedido, pagamento, entrega e gestão. Você começa do zero com tudo que precisa.' },
  { q: 'Preciso de equipe grande pra gerenciar?', a: 'Não. O sistema é feito para ser simples. Uma pessoa consegue gerenciar pedidos, pagamentos e entregadores no painel.' },
  { q: 'Dá pra integrar com meus entregadores atuais?', a: 'Sim. Você cadastra seus entregadores no sistema e atribui os pedidos a eles. O entregador recebe a rota pelo WhatsApp.' },
  { q: 'Quanto custa para começar?', a: 'R$ 79,90 por mês, com 7 dias grátis para testar. Sem taxa de setup, sem comissão por pedido, sem cartão de crédito para o teste.' },
]

export default function SistemaDeliveryPage() {
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
