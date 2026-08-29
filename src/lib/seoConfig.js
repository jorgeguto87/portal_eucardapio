// Configuração central de SEO — cada rota tem seu próprio title/description/
// canonical. Centralizado aqui em vez de espalhado pelos componentes, pra
// ficar fácil de manter e de adicionar rota nova no futuro.

const SITE_URL = 'https://portal.eucardapio.com.br'

export const seoConfig = {
  '/': {
    title: 'Eu Cardápio — Cardápio Digital e Pedido pelo WhatsApp, sem Comissão',
    description: 'Receba pedidos pelo WhatsApp com cardápio digital próprio. Pagamento direto na sua conta, sem comissão por venda — alternativa real ao iFood. 7 dias grátis.',
    canonical: `${SITE_URL}/`,
  },
  '/funcionalidades': {
    title: 'Funcionalidades do Eu Cardápio — Cardápio Digital, WhatsApp e Pagamento',
    description: 'Conheça todas as funcionalidades: cardápio digital, atendimento automático no WhatsApp, pagamento direto na sua conta, entrega organizada e painel completo.',
    canonical: `${SITE_URL}/funcionalidades`,
  },
  '/cardapio-digital': {
    title: 'Cardápio Digital para Restaurantes — Crie o Seu sem Comissão | Eu Cardápio',
    description: 'Cardápio digital próprio com fotos, categorias e opcionais. Cliente pede pelo WhatsApp, pagamento cai direto na sua conta. Sem comissão por venda. Teste grátis 7 dias.',
    canonical: `${SITE_URL}/cardapio-digital`,
  },
  '/pedido-whatsapp': {
    title: 'Sistema de Pedido pelo WhatsApp para Restaurantes | Eu Cardápio',
    description: 'Receba pedidos pelo WhatsApp com atendimento automático. Cardápio digital, pagamento online e acompanhamento em tempo real. Sem comissão. Teste grátis 7 dias.',
    canonical: `${SITE_URL}/pedido-whatsapp`,
  },
  '/pagamento-online': {
    title: 'Pagamento Online sem Intermediário — Pix e Cartão na Sua Conta | Eu Cardápio',
    description: 'Receba pagamentos por Pix e cartão direto na sua conta bancária. Sem comissão por venda, sem prazo de repasse, sem intermediário segurando seu dinheiro. Teste grátis.',
    canonical: `${SITE_URL}/pagamento-online`,
  },
  '/qr-code-mesa': {
    title: 'QR Code na Mesa — Cardápio Digital para Salão e Delivery | Eu Cardápio',
    description: 'Cliente escaneia QR Code na mesa, pede sem garçom e o pedido cai direto na cozinha. Mesmo cardápio do delivery, sem papel, sem confusão de comanda. Teste grátis 7 dias.',
    canonical: `${SITE_URL}/qr-code-mesa`,
  },
  '/sistema-delivery': {
    title: 'Sistema de Delivery Próprio — Sem Comissão por Pedido | Eu Cardápio',
    description: 'Sistema completo de delivery para restaurantes: cardápio digital, pedido por WhatsApp, pagamento online, gestão de entregadores e painel financeiro. Tudo por R$ 79,90/mês.',
    canonical: `${SITE_URL}/sistema-delivery`,
  },
  '/cashback-fidelizacao': {
    title: 'Cashback e Cupons — Fidelização de Clientes para Restaurantes | Eu Cardápio',
    description: 'Crie cupons de desconto e cashback automático pra trazer o cliente de volta. Você define as regras, o sistema cuida do resto. Sem comissão. Teste grátis 7 dias.',
    canonical: `${SITE_URL}/cashback-fidelizacao`,
  },
  '/precos': {
    title: 'Preços — R$ 79,90/mês, Sem Comissão por Pedido | Eu Cardápio',
    description: 'Plano único: R$ 79,90 por mês. Cardápio digital, WhatsApp automático, pagamento online, QR Code na mesa, cupons e cashback. Sem comissão por venda. 7 dias grátis.',
    canonical: `${SITE_URL}/precos`,
  },
  '/sobre': {
    title: 'Sobre o Eu Cardápio — Tecnologia pra Restaurante Independente',
    description: 'O Eu Cardápio nasceu pra dar ao restaurante independente as ferramentas dos grandes, sem cobrar comissão por venda. Conheça nossa história e missão.',
    canonical: `${SITE_URL}/sobre`,
  },
  '/contato': {
    title: 'Contato — Fale com o Eu Cardápio',
    description: 'Tem dúvida sobre o Eu Cardápio? Fale com a gente pelo WhatsApp ou e-mail. Respondemos rápido, sem robô.',
    canonical: `${SITE_URL}/contato`,
  },
  '/blog': {
    title: 'Blog — Dicas para Restaurantes que Fazem Delivery | Eu Cardápio',
    description: 'Dicas, tutoriais e estratégias para restaurantes que querem ter delivery próprio, receber pedido pelo WhatsApp e parar de pagar comissão.',
    canonical: `${SITE_URL}/blog`,
  },
}

export const getSeoForPath = (pathname) => seoConfig[pathname] || seoConfig['/']
