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
}

export const getSeoForPath = (pathname) => seoConfig[pathname] || seoConfig['/']
