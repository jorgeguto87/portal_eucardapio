import FeaturePageLayout from '../components/FeaturePageLayout'

const SITE_URL = 'https://portal.eucardapio.com.br'

const seo = {
  title: 'Pedidos no Balcão — Mesa, Avulso e Pra Viagem no Mesmo Painel | Eu Cardápio',
  description: 'Lance pedidos de balcão direto no painel: mesa, avulso ou pra viagem. Entra no mesmo fluxo de cozinha, impressão e financeiro do delivery. Teste grátis 7 dias.',
  canonical: `${SITE_URL}/pedidos-balcao`,
}

const hero = {
  eyebrow: 'Pedidos no Balcão',
  title: 'O pedido do balcão também merece um sistema',
  subtitle: 'Cliente chegou, pediu na hora, foi embora com o pedido — ou sentou numa mesa. Lança tudo no mesmo painel do delivery, sem caderno, sem comanda de papel.',
}

const painPoints = {
  title: 'Pedido de balcão de improviso vira bagunça',
  items: [
    { title: 'Caderno ou comanda de papel', body: 'Pedido anotado à mão some, mancha, ou ninguém entende a letra. Na correria do balcão, erro de anotação é prejuízo direto.' },
    { title: 'Não entra no financeiro', body: 'Se o pedido de balcão não passa pelo sistema, ele não aparece no relatório do dia — seu faturamento real fica escondido.' },
    { title: 'Cozinha não recebe automático', body: 'Sem impressão automática, alguém precisa levar o pedido até a cozinha na mão, ou gritar o pedido — lento e sujeito a esquecimento.' },
    { title: 'Sistema separado do delivery', body: 'Usar uma ferramenta pro balcão e outra pro delivery significa dois cadastros de produto, dois relatórios, o dobro de trabalho.' },
  ],
}

const solution = {
  tag: 'a solução',
  title: 'O mesmo painel, três formas de vender',
  body: 'No Eu Cardápio, um pedido de balcão pode ser pra uma mesa do salão, um pedido avulso no caixa, ou pra viagem — você escolhe na hora de lançar, e ele entra no mesmo fluxo do delivery: aparece na cozinha, no financeiro e pode até sair impresso automaticamente.',
  items: [
    'Lança o pedido direto no painel, sem app separado',
    'Escolhe entre mesa, avulso ou pra viagem',
    'Usa o mesmo cardápio e os mesmos preços do delivery',
    'Entra automático no relatório financeiro do dia',
    'Pode imprimir na cozinha assim que lançar',
    'Mesma equipe, mesmo login, sem sistema duplicado',
  ],
}

const benefits = {
  title: 'Por que centralizar o balcão no mesmo sistema',
  items: [
    { icon: '🧾', title: 'Sem papel', body: 'O pedido é lançado no painel e some o risco de perder ou não entender a comanda anotada à mão.' },
    { icon: '📊', title: 'Financeiro completo', body: 'Balcão, mesa e delivery aparecem juntos no relatório do dia. Você vê o faturamento real, sem parte escondida.' },
    { icon: '🍳', title: 'Cozinha recebe na hora', body: 'Com a impressão automática ligada, o pedido de balcão sai impresso na cozinha assim que é lançado, igual ao delivery.' },
    { icon: '🪑', title: 'Serve mesa e avulso', body: 'Pediu sentado numa mesa? Marca como mesa. Pediu no caixa pra levar? Marca como avulso. O sistema se adapta ao seu salão.' },
    { icon: '🔁', title: 'Um cardápio só', body: 'Os mesmos produtos, preços e opcionais do delivery valem pro balcão — cadastra uma vez, usa em tudo.' },
    { icon: '👥', title: 'Equipe já treinada', body: 'Quem já usa o painel pra delivery lança um pedido de balcão em segundos — é a mesma tela, um fluxo a mais.' },
  ],
}

const steps = {
  title: 'Como lançar um pedido de balcão',
  items: [
    { title: 'Abra um novo pedido no painel', body: 'No painel de pedidos, inicie um pedido novo e escolha o tipo: balcão.' },
    { title: 'Escolha mesa, avulso ou pra viagem', body: 'Selecione o modo que combina com esse pedido — se for pra uma mesa do salão, se é venda direta no caixa, ou se o cliente vai levar.' },
    { title: 'Monte o pedido e confirme', body: 'Adicione os produtos do cardápio, confirme o pagamento e pronto — o pedido já entra no fluxo de cozinha e financeiro, igual ao delivery.' },
  ],
}

const faq = [
  { q: 'Pedido de balcão soma no mesmo relatório financeiro do delivery?', a: 'Sim. Todo pedido — delivery, mesa ou balcão — aparece no mesmo relatório de faturamento, filtrado por tipo quando você quiser ver separado.' },
  { q: 'Dá pra usar o balcão sem ter delivery ativo?', a: 'Sim. O modo balcão funciona mesmo que seu restaurante não trabalhe com entrega — é útil pra quem atende só no salão ou também vende pra viagem no caixa.' },
  { q: 'O pedido de balcão pode sair impresso automaticamente?', a: 'Sim, se você tiver o programa de impressão instalado no computador do restaurante. O pedido pode sair direto na impressora da cozinha, do bar ou do balcão, sem precisar digitar de novo.' },
  { q: 'Preciso cadastrar os produtos de novo pro balcão?', a: 'Não. O balcão usa o mesmo cardápio, os mesmos preços e os mesmos opcionais já cadastrados para o delivery e a mesa.' },
  { q: 'Isso substitui uma máquina de cartão física?', a: 'Não. O pedido de balcão organiza o que foi vendido e pra quem, mas o pagamento presencial (dinheiro, maquininha) continua sendo cobrado normalmente por você — o sistema só registra a forma de pagamento usada.' },
]

// Palavras usadas para escolher os artigos relacionados do blog no fim da página.
const blogKeywords = ["balcão", "pdv", "ponto de venda", "caixa"]

export default function PedidosBalcaoPage() {
  return (
    <FeaturePageLayout
      seo={seo}
      hero={hero}
      painPoints={painPoints}
      solution={solution}
      benefits={benefits}
      steps={steps}
      faq={faq}
      blogKeywords={blogKeywords}
    />
  )
}
