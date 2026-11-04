import { PAINEL_URL } from '../lib/api'

export const SITE = {
  url: 'https://portal.eucardapio.com.br',
  painelUrl: PAINEL_URL,
  // Cadastro fica na home (seção #comecar); o ScrollToTop rola até ela.
  signupHref: '/#comecar',
  whatsapp: 'https://wa.me/5521999363578',
  email: 'eucardapio@gmail.com',
  price: 'R$ 129,90',
  trialDays: 7,
  trialBadge: ['7 dias grátis', 'Sem cartão de crédito', 'Sem comissão por pedido'],
}

// Funcionalidades — ordem do menu, da grade e do rodapé.
export const FEATURES = [
  { slug: 'cardapio-digital', title: 'Cardápio digital', short: 'Fotos, categorias, opcionais e adicionais. Abre no celular, sem baixar nada.', icon: 'BookOpen' },
  { slug: 'pedido-whatsapp', title: 'WhatsApp automático', short: 'Menu automático, link do cardápio, confirmação e aviso de cada etapa do pedido.', icon: 'MessageCircle' },
  { slug: 'pagamento-online', title: 'Pagamento online', short: 'Pix e cartão direto na sua conta, ou pagamento na entrega.', icon: 'Wallet' },
  { slug: 'sistema-delivery', title: 'Sistema de delivery', short: 'Fila por entregador, lista no WhatsApp e cliente avisado na hora.', icon: 'Bike' },
  { slug: 'qr-code-mesa', title: 'QR Code na mesa', short: 'O cliente do salão pede pelo celular e o pedido cai no painel.', icon: 'QrCode' },
  { slug: 'pedidos-balcao', title: 'Pedidos no balcão', short: 'Lance pedidos de mesa, avulso ou entrega no mesmo painel.', icon: 'Store' },
  { slug: 'multiplas-impressoras', title: 'Impressão automática', short: 'Até 3 impressoras: balcão, cozinha e entrega, sem tocar em nada.', icon: 'Printer' },
  { slug: 'cashback-fidelizacao', title: 'Cashback e cupons', short: 'Crédito para a próxima compra e cupons que trazem o cliente de volta.', icon: 'Gift' },
]

export const featureBySlug = (slug) => FEATURES.find((f) => f.slug === slug)
