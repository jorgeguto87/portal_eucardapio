import FeaturePageLayout from '../components/FeaturePageLayout'

const SITE_URL = 'https://portal.eucardapio.com.br'

const seo = {
  title: 'QR Code na Mesa — Cardápio Digital para Salão e Delivery | Eu Cardápio',
  description: 'Cliente escaneia QR Code na mesa, pede sem garçom e o pedido cai direto na cozinha. Mesmo cardápio do delivery, sem papel, sem confusão de comanda. Teste grátis 7 dias.',
  canonical: `${SITE_URL}/qr-code-mesa`,
}

const hero = {
  eyebrow: 'QR Code na Mesa',
  title: 'O cliente escaneia, pede e a cozinha já sabe',
  subtitle: 'O mesmo cardápio do delivery, agora também pro salão. Sem garçom anotando, sem papel, sem confusão de comanda. O pedido cai direto na cozinha.',
}

const painPoints = {
  title: 'A comanda de papel não acompanha o rush',
  items: [
    { title: 'Garçom não dá conta', body: 'Na hora do pico, o cliente espera 15 minutos só pra alguém anotar o pedido. A comida esfria e a experiência também.' },
    { title: 'Comanda se perde', body: 'Papel rasga, suja, some. Pedido chega errado na cozinha porque alguém não entendeu a letra do garçom.' },
    { title: 'Sem foto, sem venda', body: 'Cliente lê "frango à passarinho" no cardápio de papel e não sabe o que é. Sem foto, pede o que já conhece — e gasta menos.' },
    { title: 'Fechar a conta demora', body: 'Cliente quer ir embora, mas precisa chamar o garçom, esperar ele trazer a conta, levar a maquininha. Tudo manual, tudo lento.' },
  ],
}

const solution = {
  tag: 'a solução',
  title: 'Um QR Code que substitui a comanda',
  body: 'O cliente escaneia o QR Code na mesa com o celular, vê o cardápio com fotos, monta o pedido e paga — tudo sozinho. O pedido cai direto na cozinha com o número da mesa.',
  items: [
    'Cardápio com fotos em cada item',
    'Pedido cai na cozinha com número da mesa',
    'Cliente paga pelo celular (Pix ou cartão)',
    'Sem garçom pra anotar ou trazer a conta',
    'Funciona com o mesmo cardápio do delivery',
    'Um QR Code por mesa, impresso ou em suporte',
  ],
}

const benefits = {
  title: 'O que muda com QR Code na mesa',
  items: [
    { icon: '⚡', title: 'Pedido na hora', body: 'Cliente escaneia e pede. Não precisa esperar garçom, não precisa esperar atendimento. A cozinha recebe na hora.' },
    { icon: '📸', title: 'Foto vende mais', body: 'Cliente vê a foto de cada prato no celular. Vê, escolhe, pede. Ticket médio sobe quando tem imagem.' },
    { icon: '🧾', title: 'Sem erro de comanda', body: 'O pedido vai digital da mesa pra cozinha. Nada de letra ilegível, nada de item esquecido na anotação.' },
    { icon: '💳', title: 'Conta no celular', body: 'Cliente paga pelo próprio celular e pode ir embora. Sem esperar caixa, sem fila no balcão.' },
    { icon: '🔄', title: 'Delivery e salão juntos', body: 'Mesmo cardápio, mesmo painel, mesmo sistema. Você não precisa manter dois cardápios separados.' },
    { icon: '📊', title: 'Controle por mesa', body: 'Sabe qual mesa pediu o quê, quanto gastou e quando. O painel organiza tudo por mesa automaticamente.' },
  ],
}

const steps = {
  title: 'Do scan ao pedido na cozinha',
  items: [
    { title: 'Cliente escaneia o QR Code', body: 'Cada mesa tem um QR Code (impresso ou em suporte). O cliente aponta a câmera do celular e o cardápio abre.' },
    { title: 'Escolhe e paga pelo celular', body: 'Navega pelo cardápio, monta o pedido com opcionais e paga por Pix ou cartão sem chamar ninguém.' },
    { title: 'Pedido cai na cozinha', body: 'A cozinha recebe o pedido com o número da mesa. Prepara, entrega na mesa, e pronto.' },
  ],
}

const faq = [
  { q: 'Preciso de internet no salão?', a: 'O cliente usa a internet do próprio celular para escanear e fazer o pedido. O seu painel precisa de internet para receber os pedidos na cozinha — qualquer conexão serve.' },
  { q: 'Funciona com mesas numeradas?', a: 'Sim. Cada QR Code é vinculado a um número de mesa. O pedido chega na cozinha já identificando de onde veio.' },
  { q: 'O cliente precisa baixar algum app?', a: 'Não. O cardápio abre no navegador do celular ao escanear o QR Code. Zero download, zero atrito.' },
  { q: 'Posso usar QR Code na mesa e delivery ao mesmo tempo?', a: 'Sim, é o mesmo sistema e o mesmo cardápio. O cliente do delivery pede pelo WhatsApp, o cliente da mesa pede pelo QR Code. Tudo cai no mesmo painel.' },
  { q: 'Como imprimo os QR Codes?', a: 'O sistema gera os QR Codes pra você. Você imprime em papel comum, coloca em suporte de mesa, ou cola diretamente na mesa.' },
]

export default function QrCodeMesaPage() {
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
