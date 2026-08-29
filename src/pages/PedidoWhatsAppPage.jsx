import FeaturePageLayout from '../components/FeaturePageLayout'

const SITE_URL = 'https://portal.eucardapio.com.br'

const seo = {
  title: 'Sistema de Pedido pelo WhatsApp para Restaurantes | Eu Cardápio',
  description: 'Receba pedidos pelo WhatsApp com atendimento automático. Cardápio digital, pagamento online e acompanhamento em tempo real. Sem comissão. Teste grátis 7 dias.',
  canonical: `${SITE_URL}/pedido-whatsapp`,
}

const hero = {
  eyebrow: 'Pedido pelo WhatsApp',
  title: 'O atendimento que nunca faz seu cliente esperar',
  subtitle: 'Um chatbot com a cara da sua loja atende quantos clientes precisar, ao mesmo tempo. Cardápio, pedido, pagamento e acompanhamento — tudo pelo WhatsApp.',
}

const painPoints = {
  title: 'Atender pelo WhatsApp não escala',
  items: [
    { title: 'Uma pessoa de cada vez', body: 'Enquanto você anota um pedido, outros três clientes esperam. Na hora do rush, alguém desiste e pede no concorrente.' },
    { title: 'Erro de anotação', body: 'Cliente pede sem cebola, você esquece de anotar. Pedido sai errado, cliente reclama, você perde dinheiro.' },
    { title: 'Sem horário, sem limite', body: 'Não dá pra bloquear pedidos fora do horário de funcionamento. Cliente pede às 23h, você já fechou.' },
    { title: 'Conversa se perde', body: 'Endereço, forma de pagamento, troco — tudo espalhado em mensagens que ninguém organiza depois.' },
  ],
}

const solution = {
  tag: 'a solução',
  title: 'Um robô que atende como a sua loja',
  body: 'O chatbot do Eu Cardápio é integrado ao seu restaurante, não um robô genérico. Ele mostra o cardápio, recebe o pedido, processa o pagamento e acompanha a entrega — tudo no mesmo canal.',
  items: [
    'Atende todos os clientes ao mesmo tempo',
    'Mostra o cardápio com fotos e opcionais',
    'Recebe pagamento (Pix ou cartão) na hora',
    'Bloqueia pedidos fora do horário',
    'Envia confirmação e acompanhamento',
    'Tem a identidade visual da sua loja',
  ],
}

const benefits = {
  title: 'O que muda com o WhatsApp automático',
  items: [
    { icon: '🤖', title: 'Atendimento 24/7', body: 'O bot atende a qualquer hora. Se você quiser, bloqueia fora do horário — mas nunca deixa cliente sem resposta.' },
    { icon: '⚡', title: 'Zero fila de espera', body: 'Cem clientes mandando mensagem ao mesmo tempo? Todos recebem resposta imediata, sem fila.' },
    { icon: '📝', title: 'Pedido sem erro', body: 'O cliente monta o pedido sozinho no cardápio digital. O que ele escolhe é o que chega na cozinha.' },
    { icon: '💳', title: 'Pagamento na conversa', body: 'Pix ou cartão sem sair do WhatsApp. O valor cai direto na sua conta, sem intermediário.' },
    { icon: '📍', title: 'Endereço organizado', body: 'O bot pede e confirma o endereço. Nada de ficar procurando nas mensagens depois.' },
    { icon: '🔔', title: 'Acompanhamento automático', body: 'Cliente recebe cada atualização no WhatsApp: pedido confirmado, em preparo, saiu pra entrega.' },
  ],
}

const steps = {
  title: 'Do "oi" ao pedido pronto',
  items: [
    { title: 'Cliente chama no WhatsApp', body: 'Manda mensagem pro seu número e o bot responde na hora com o cardápio — sem baixar app.' },
    { title: 'Escolhe, paga e confirma', body: 'Navega pelo cardápio, monta o pedido com opcionais e paga (Pix ou cartão) sem sair do chat.' },
    { title: 'Pedido cai no seu painel', body: 'Já pago, já confirmado. Sua cozinha clica em "Iniciar preparo" e o cliente é avisado automaticamente.' },
  ],
}

const faq = [
  { q: 'O bot substitui totalmente o atendimento humano?', a: 'Ele substitui a parte operacional — mostrar cardápio, anotar pedido, processar pagamento. Você continua atendendo pessoalmente quando precisar, mas o volume de mensagens repetitivas cai drasticamente.' },
  { q: 'Preciso de um número novo de WhatsApp?', a: 'Você pode usar o número que já tem. O sistema se conecta ao seu WhatsApp Business para automatizar o atendimento.' },
  { q: 'O cliente percebe que é um robô?', a: 'O bot tem a identidade visual da sua loja e conversa de forma natural. O cliente tem uma experiência fluida, não sente que está falando com uma máquina fria.' },
  { q: 'Funciona se eu tiver muitos clientes ao mesmo tempo?', a: 'Sim. O bot atende todos simultaneamente, sem fila. Cada cliente tem sua própria conversa e seu próprio pedido.' },
  { q: 'Dá pra desligar o bot na hora que eu quiser?', a: 'Sim. Você pode pausar o atendimento automático e responder manualmente quando preferir, ou configurar horários de funcionamento.' },
]

export default function PedidoWhatsAppPage() {
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
