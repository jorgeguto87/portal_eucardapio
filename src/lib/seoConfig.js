// Configuração central de SEO — cada rota tem seu próprio title/description/
// canonical. Centralizado aqui em vez de espalhado pelos componentes, pra
// ficar fácil de manter e de adicionar rota nova no futuro.

const SITE_URL = 'https://portal.eucardapio.com.br'

export const seoConfig = {
  '/': {
    title: 'Eu Cardápio — Cardápio Digital, WhatsApp Automático e Delivery sem Comissão',
    description: 'Cardápio digital próprio, atendimento automático no WhatsApp, entregas organizadas e pagamento direto na sua conta. Sem comissão por pedido. 7 dias grátis.',
    canonical: `${SITE_URL}/`,
  },
  '/funcionalidades': {
    title: 'Funcionalidades do Eu Cardápio — Cardápio Digital, WhatsApp e Entregas',
    description: 'Cardápio digital, WhatsApp automático, pagamento online, entregas pelo WhatsApp, QR Code na mesa, balcão, impressão automática, cupons e cashback.',
    canonical: `${SITE_URL}/funcionalidades`,
  },
  '/cardapio-digital': {
    title: 'Cardápio Digital para Restaurantes — Sem Comissão | Eu Cardápio',
    description: 'Cardápio digital próprio com fotos, categorias, opcionais e adicionais. O cliente pede pelo celular e paga direto na sua conta. Sem comissão. Teste grátis 7 dias.',
    canonical: `${SITE_URL}/cardapio-digital`,
  },
  '/pedido-whatsapp': {
    title: 'Atendimento e Pedidos com WhatsApp Automático para Restaurantes | Eu Cardápio',
    description: 'Robô de WhatsApp que responde na hora, envia o cardápio digital, confirma o pedido e avisa cada etapa da entrega. Sem comissão. Teste grátis 7 dias.',
    canonical: `${SITE_URL}/pedido-whatsapp`,
  },
  '/pagamento-online': {
    title: 'Pagamento Online sem Intermediário — Pix e Cartão na Sua Conta | Eu Cardápio',
    description: 'Receba por Pix e cartão direto na sua conta do Mercado Pago, PagBank ou InfinitePay. Pix com chave e pagamento na entrega. Sem comissão por venda.',
    canonical: `${SITE_URL}/pagamento-online`,
  },
  '/qr-code-mesa': {
    title: 'QR Code na Mesa — Cardápio Digital para Salão e Delivery | Eu Cardápio',
    description: 'O cliente escaneia o QR Code, pede pelo celular e o pedido cai no painel e na impressora com o número da mesa. Mesmo cardápio do delivery. Teste grátis 7 dias.',
    canonical: `${SITE_URL}/qr-code-mesa`,
  },
  '/sistema-delivery': {
    title: 'Sistema de Delivery Próprio com Entregas pelo WhatsApp | Eu Cardápio',
    description: 'Fila por entregador, lista de entregas no WhatsApp, endereço com mapa e cliente avisado em cada etapa. Tudo por R$ 129,90/mês, sem comissão por pedido.',
    canonical: `${SITE_URL}/sistema-delivery`,
  },
  '/cashback-fidelizacao': {
    title: 'Cashback e Cupons — Fidelização de Clientes para Restaurantes | Eu Cardápio',
    description: 'Cashback por pedido, categoria ou produto e cupons de desconto ou item grátis, com as suas regras. Incluso na assinatura. Teste grátis 7 dias.',
    canonical: `${SITE_URL}/cashback-fidelizacao`,
  },
  '/pedidos-balcao': {
    title: 'Pedidos no Balcão — Mesa, Avulso e Entrega no Mesmo Painel | Eu Cardápio',
    description: 'Lance pedidos de balcão como mesa, avulso ou entrega no mesmo painel do delivery. Cozinha, impressora e relatório juntos. Teste grátis 7 dias.',
    canonical: `${SITE_URL}/pedidos-balcao`,
  },
  '/multiplas-impressoras': {
    title: 'Impressão Automática de Pedidos em até 3 Impressoras | Eu Cardápio',
    description: 'Cada pedido sai impresso sozinho nas impressoras de balcão, cozinha e entrega. Delivery, mesa e balcão. Teste grátis 7 dias.',
    canonical: `${SITE_URL}/multiplas-impressoras`,
  },
  '/precos': {
    title: 'Preços — R$ 129,90/mês, Sem Comissão por Pedido | Eu Cardápio',
    description: 'Plano único de R$ 129,90 por mês com tudo incluso: cardápio digital, WhatsApp automático, pagamento online, entregas, mesa, balcão, cupons e cashback. 7 dias grátis.',
    canonical: `${SITE_URL}/precos`,
  },
  '/sobre': {
    title: 'Sobre o Eu Cardápio — Tecnologia para Restaurante Independente',
    description: 'O Eu Cardápio nasceu para dar ao restaurante independente as ferramentas dos grandes, sem cobrar comissão por venda. Conheça nossa história.',
    canonical: `${SITE_URL}/sobre`,
  },
  '/contato': {
    title: 'Contato — Fale com o Eu Cardápio',
    description: 'Tem dúvida sobre o Eu Cardápio? Fale com a gente pelo WhatsApp ou e-mail.',
    canonical: `${SITE_URL}/contato`,
  },
  '/blog': {
    title: 'Blog — Dicas para Restaurantes que Fazem Delivery | Eu Cardápio',
    description: 'Dicas, tutoriais e estratégias para restaurantes que querem ter delivery próprio, atendimento automático no WhatsApp e parar de pagar comissão.',
    canonical: `${SITE_URL}/blog`,
  },
}

export const getSeoForPath = (pathname) => seoConfig[pathname] || seoConfig['/']
