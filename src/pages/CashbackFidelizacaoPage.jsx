import FeaturePageLayout from '../components/FeaturePageLayout'

const SITE_URL = 'https://portal.eucardapio.com.br'

const seo = {
  title: 'Cashback e Cupons — Fidelização de Clientes para Restaurantes | Eu Cardápio',
  description: 'Crie cupons de desconto e cashback automático pra trazer o cliente de volta. Você define as regras, o sistema cuida do resto. Sem comissão. Teste grátis 7 dias.',
  canonical: `${SITE_URL}/cashback-fidelizacao`,
}

const hero = {
  eyebrow: 'Cashback e Fidelização',
  title: 'Cupons e cashback que trazem o cliente de volta',
  subtitle: 'Crie promoções do seu jeito — desconto, item grátis ou cashback pra próxima compra. Você define as regras, o sistema cuida do resto. O cliente volta sozinho.',
}

const painPoints = {
  title: 'Conseguir cliente novo é caro. Perder o que já veio é pior.',
  items: [
    { title: 'Cliente pede uma vez e some', body: 'Sem motivo pra voltar, o cliente experimenta e esquece. Você gasta pra atrair e não vê retorno.' },
    { title: 'Desconto que não fideliza', body: 'Dar desconto no app de delivery atrai quem procura preço baixo, não quem volta. O cliente é do desconto, não seu.' },
    { title: 'Sem dados de quem compra', body: 'Você não sabe quem pediu, quando, se gostou. Sem isso, não tem como mandar promoção na hora certa.' },
    { title: 'Programa de fidelidade caro', body: 'Sistemas de fidelização tradicionais são complexos e caros. Cartãozinho de papel se perde, app separado ninguém baixa.' },
  ],
}

const solution = {
  tag: 'a solução',
  title: 'Fidelização que funciona de verdade',
  body: 'O cashback do Eu Cardápio é automático e digital. O cliente acumula crédito nas compras e usa na próxima — sem cartão de papel, sem app separado. Tudo pelo Cardápio Digital que ele já usa.',
  items: [
    'Cashback automático em cada compra',
    'Cupons de desconto ou item grátis',
    'Você define o valor e as regras',
    'Cliente acompanha o saldo pelo Cardápio',
    'Sem cartão de papel, sem app separado',
    'Relatório de quem voltou e quanto gastou',
  ],
}

const benefits = {
  title: 'Por que cashback funciona melhor',
  items: [
    { icon: '🔄', title: 'Cliente volta', body: 'Quem tem crédito acumulado tem motivo pra voltar. É psicologia simples: ninguém deixa dinheiro na mesa.' },
    { icon: '🎯', title: 'Você define as regras', body: '10% de cashback? R$ 5 fixo? Só no primeiro pedido? Você decide. O sistema aplica automaticamente.' },
    { icon: '📱', title: 'Tudo no Cardápio', body: 'O cliente vê o saldo e usa o crédito sem baixar nada. É o próprio Cardápio Digital que ele já está usando..' },
    { icon: '📊', title: 'Você mede o resultado', body: 'Sabe quantos clientes voltaram, quantas vezes, quanto gastaram. Dados pra decidir se a promoção vale a pena.' },
    { icon: '🎁', title: 'Cupom pra ocasião certa', body: 'Cupom de aniversário, cupom de segunda-feira lenta, cupom de primeira compra. Segmenta e dispara no momento certo.' },
    { icon: '🏷️', title: 'Sem custo por uso', body: 'Cupons e cashback estão inclusos na assinatura. Sem taxa por cupom, sem comissão por resgate.' },
  ],
}

const steps = {
  title: 'Como funciona o cashback',
  items: [
    { title: 'Você cria a regra', body: 'Define quanto de cashback o cliente ganha por compra (ex: 5% do valor do pedido) e se quer cupons ativos.' },
    { title: 'Cliente acumula sozinho', body: 'A cada pedido, o sistema credita o cashback automaticamente. O cliente acompanha o saldo pelo Cardápio Digital.' },
    { title: 'Cliente usa na próxima compra', body: 'No pedido seguinte, ele escolhe usar o saldo. O desconto é aplicado e o pedido segue normal.' },
  ],
}

const faq = [
  { q: 'Quem paga o cashback — eu ou o Eu Cardápio?', a: 'O cashback é um desconto que você oferece ao cliente, então sai do seu faturamento. Você define o valor e tem controle total sobre quanto quer investir em fidelização.' },
  { q: 'O cliente precisa de um cartão ou app?', a: 'Não. O cashback é automático e digital. O cliente acumula e consulta o saldo pelo Cardápio Digital, sem baixar nada nem carregar cartão.' },
  { q: 'Posso criar cupons para ocasiões específicas?', a: 'Sim. Você pode criar cupons de desconto, item grátis, primeira compra, aniversário — o que fizer sentido para o seu restaurante.' },
  { q: 'Consigo ver se a fidelização está funcionando?', a: 'Sim. O painel mostra quantos clientes voltaram, quantas vezes pediram e quanto gastaram. Você mede o retorno antes de decidir continuar.' },
  { q: 'Tem limite de cupons ou clientes no plano?', a: 'Não. Cupons e cashback são inclusos na assinatura de R$ 79,90/mês, sem limite de uso. Você cria quantos cupons quiser.' },
]

export default function CashbackFidelizacaoPage() {
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
