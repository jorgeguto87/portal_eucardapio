import FeaturePageLayout from '../components/FeaturePageLayout'

const SITE_URL = 'https://portal.eucardapio.com.br'

const seo = {
  title: 'Cardápio Digital para Restaurantes — Crie o Seu sem Comissão | Eu Cardápio',
  description: 'Cardápio digital próprio com fotos, categorias e opcionais. Cliente pede pelo WhatsApp, pagamento cai direto na sua conta. Sem comissão por venda. Teste grátis 7 dias.',
  canonical: `${SITE_URL}/cardapio-digital`,
}

const hero = {
  eyebrow: 'Cardápio Digital',
  title: 'Seu cardápio digital, do jeito que você sempre quis mostrar',
  subtitle: 'Fotos, categorias organizadas, opcionais e adicionais. O cliente vê exatamente o que você quer que ele veja — e pede sem baixar nada.',
}

const painPoints = {
  title: 'O cardápio de papel e o PDF não servem mais',
  items: [
    { title: 'Cliente não vê as fotos', body: 'PDF no WhatsApp é pequeno, demora pra abrir e ninguém tem paciência de ficar zoomando pra ver o que tem.' },
    { title: 'Preço desatualizado', body: 'Esqueceu de atualizar o PDF? Cliente pede pelo preço errado, você perde dinheiro ou perde o cliente.' },
    { title: 'Sem opcionais', body: 'Ponto da carne, molho extra, borda recheada — tudo tem que ser combinado por mensagem, uma de cada vez.' },
    { title: 'Impossível de achar', body: 'Seu cardápio some no meio das conversas do WhatsApp. Cliente novo não sabe nem por onde começar.' },
  ],
}

const solution = {
  tag: 'a solução',
  title: 'Um cardápio que vende por você',
  body: 'Cada produto tem foto, descrição, preço e opcionais configurados por você. O cliente navega, monta o pedido e paga — tudo sozinho, sem você precisar atender.',
  items: [
    'Fotos profissionais em cada item',
    'Categorias organizadas do seu jeito',
    'Opcionais e adicionais por categoria',
    'Banners de destaque para promoções',
    'Preço atualiza na hora que você muda',
    'Funciona no celular sem instalar nada',
  ],
}

const benefits = {
  title: 'Por que seu cardápio digital importa',
  items: [
    { icon: '📸', title: 'Foto vende mais', body: 'Cliente que vê a foto do prato pede mais. Seu cardápio digital deixa cada item com imagem própria.' },
    { icon: '⚡', title: 'Atualização instantânea', body: 'Acabou o estoque? Mudou o preço? Você altera no painel e reflete na hora pro cliente.' },
    { icon: '🧩', title: 'Opcionais de verdade', body: 'Meio a meio, ponto da carne, sem cebola, com borda — tudo configurável, sem erro de pedido.' },
    { icon: '📱', title: 'Sem app pra baixar', body: 'O cliente abre o link pelo WhatsApp e já vê o cardápio. Zero atrito, zero abandono.' },
    { icon: '🏷️', title: 'Promoções no destaque', body: 'Coloque o prato do dia ou a promoção da semana em banner no topo do cardápio.' },
    { icon: '🔗', title: 'Link seu, regra sua', body: 'Seu cardápio tem endereço próprio. Você compartilha onde quiser — Instagram, WhatsApp, panfletos.' },
  ],
}

const steps = {
  title: 'Seu cardápio no ar em minutos',
  items: [
    { title: 'Cadastre seus produtos', body: 'Nome, preço, foto e categoria. Adicione opcionais e adicionais nos itens que precisam.' },
    { title: 'Compartilhe o link', body: 'Coloque o link do seu cardápio no Instagram, no WhatsApp, no panfleto — onde seu cliente estiver.' },
    { title: 'Receba pedidos prontos', body: 'O cliente monta o pedido sozinho, paga, e você recebe tudo confirmado no painel.' },
  ],
}

const faq = [
  { q: 'Preciso saber programar pra criar o cardápio?', a: 'Não. O painel do Eu Cardápio é simples: você cadastra produto, preço e foto como se estivesse preenchendo um formulário. Em minutos seu cardápio está no ar.' },
  { q: 'O cliente precisa baixar algum aplicativo?', a: 'Não. O cardápio abre direto no navegador do celular pelo link que você compartilha no WhatsApp ou no Instagram.' },
  { q: 'Posso ter fotos em todos os produtos?', a: 'Sim. Cada produto pode ter sua própria foto. Recomendamos usar fotos — pedidos com imagem convertem muito mais.' },
  { q: 'Consigo mudar o preço quando eu quiser?', a: 'Sim, e a mudança reflete na hora para o cliente. Acabou um item? Desativa com um clique.' },
  { q: 'Dá pra colocar opcionais como ponto da carne ou borda recheada?', a: 'Dá. Você cria grupos de opcionais (ex: "Ponto da carne: mal passado, ao ponto, bem passado") e aplica aos produtos que precisam.' },
]

export default function CardapioDigitalPage() {
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
