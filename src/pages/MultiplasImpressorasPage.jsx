import FeaturePageLayout from '../components/FeaturePageLayout'

const SITE_URL = 'https://portal.eucardapio.com.br'

const seo = {
  title: 'Impressão Automática em Até 3 Impressoras | Eu Cardápio',
  description: 'Programa próprio pra Windows imprime o pedido automaticamente em até 3 impressoras — cozinha, bar e balcão — sem precisar digitar de novo. Teste grátis 7 dias.',
  canonical: `${SITE_URL}/multiplas-impressoras`,
}

const hero = {
  eyebrow: 'Impressão em Múltiplas Impressoras',
  title: 'O pedido cai na impressora certa, sozinho',
  subtitle: 'Um programa próprio, instalado no computador do restaurante, manda a comanda direto pra até 3 impressoras — cozinha, bar, balcão — assim que o pedido chega.',
}

const painPoints = {
  title: 'Passar o pedido pra cozinha na mão trava a operação',
  items: [
    { title: 'Alguém precisa levar o pedido', body: 'Sem impressão automática, alguém para o que está fazendo pra avisar a cozinha ou o bar sobre cada pedido novo.' },
    { title: 'Comanda escrita à mão', body: 'Reescrever o pedido pra dar pra cozinha é tempo perdido e mais uma chance de errar um item ou uma observação.' },
    { title: 'Pedido de bar e de cozinha misturados', body: 'Sem separar por setor, a cozinha recebe pedido de bebida e o bar recebe pedido de prato — confusão que atrasa todo mundo.' },
    { title: 'Depende de olhar a tela o tempo todo', body: 'Se ninguém está de olho no painel, o pedido novo demora a ser notado e o cliente espera mais do que devia.' },
  ],
}

const solution = {
  tag: 'a solução',
  title: 'Um programa que imprime pra você',
  body: 'Instale o programa do Eu Cardápio no computador do restaurante, conecte até 3 impressoras térmicas e configure o que cada uma imprime. A partir daí, todo pedido novo sai impresso sozinho, no setor certo, sem ninguém precisar tocar em nada.',
  items: [
    'Programa próprio pra Windows, simples de instalar',
    'Conecta até 3 impressoras térmicas ao mesmo tempo',
    'Define o que cada impressora imprime (cozinha, bar, balcão)',
    'Imprime automaticamente assim que o pedido chega',
    'Funciona pra pedidos de delivery, mesa e balcão',
    'Reimpressão manual quando precisar, direto do painel',
  ],
}

const benefits = {
  title: 'Por que automatizar a impressão',
  items: [
    { icon: '⚡', title: 'Sem intervenção manual', body: 'O pedido chega e já sai impresso. Ninguém precisa parar o que está fazendo pra avisar a cozinha.' },
    { icon: '🖨️', title: 'Até 3 impressoras', body: 'Separe por setor — uma impressora pra cozinha, uma pro bar, uma pro balcão — cada pedido sai só onde precisa.' },
    { icon: '📋', title: 'Sem reescrever nada', body: 'O que o cliente pediu é exatamente o que sai impresso — sem intermediário reescrevendo e arriscando errar um item.' },
    { icon: '🔁', title: 'Vale pra qualquer canal', body: 'Pedido de delivery, de mesa ou de balcão — todos passam pela mesma impressão automática, sem configurar de novo.' },
    { icon: '🖥️', title: 'Roda no seu computador', body: 'O programa fica instalado no computador do restaurante — não depende da internet do celular de ninguém.' },
    { icon: '🔄', title: 'Reimprime quando precisar', body: 'Impressora travou ou papel acabou no meio do pedido? Reimprime manualmente pelo painel a qualquer momento.' },
  ],
}

const steps = {
  title: 'Como configurar a impressão automática',
  items: [
    { title: 'Instale o programa no computador', body: 'Baixe e instale o programa do Eu Cardápio no computador do restaurante que vai ficar ligado às impressoras.' },
    { title: 'Conecte suas impressoras térmicas', body: 'Ligue até 3 impressoras ao computador e identifique cada uma no programa (ex: cozinha, bar, balcão).' },
    { title: 'Ative a impressão automática no painel', body: 'No painel de pedidos, escolha quais impressoras recebem os pedidos automaticamente. A partir daí, é só receber pedido.' },
  ],
}

const faq = [
  { q: 'Isso é uma impressão fiscal, tipo cupom fiscal ou NFC-e?', a: 'Não. É uma impressão de comanda/pedido para uso interno da operação (cozinha, bar, balcão), feita em impressora térmica comum. Não substitui nota fiscal, cupom fiscal (SAT) ou NFC-e — se seu restaurante emite documento fiscal, isso continua sendo feito pelo seu emissor fiscal normalmente, separado do Eu Cardápio.' },
  { q: 'Preciso de um computador Windows ligado o tempo todo?', a: 'Sim. O programa de impressão roda num computador com Windows no restaurante, conectado às impressoras. Ele fica em segundo plano, imprimindo os pedidos conforme chegam.' },
  { q: 'Quantas impressoras posso usar?', a: 'Até 3 impressoras ao mesmo tempo, cada uma configurada pra um setor — por exemplo, cozinha, bar e balcão.' },
  { q: 'Funciona com qualquer impressora?', a: 'O programa foi pensado pra impressoras térmicas de comanda, comuns em restaurantes. Ao configurar, você indica qual impressora vai receber cada tipo de pedido.' },
  { q: 'Se a internet cair, a impressão para de funcionar?', a: 'O programa depende de conexão com o sistema pra receber os pedidos novos. Sem internet no computador onde ele está instalado, a impressão automática não acontece até a conexão voltar.' },
]

// Palavras usadas para escolher os artigos relacionados do blog no fim da página.
const blogKeywords = ["impressora", "impressão", "cozinha"]

export default function MultiplasImpressorasPage() {
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
