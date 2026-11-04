// Conversas das simulações de WhatsApp. Os textos do robô são os mesmos que
// o sistema envia (api: bot.service.js e order.service.js). Se o robô mudar,
// atualize aqui. Restaurante, cliente e entregador são fictícios.
//
// Tipos de mensagem:
//   { de: 'cliente' | 'loja' | 'atendente', texto }
//   { de: 'loja', texto, link: { titulo, url } }   → prévia de link
//   { de: 'loja', texto, mapa: true }              → prévia de mapa
//   { de: 'cliente', comprovante: true }           → imagem enviada
//   { aviso: 'texto' }                             → selo no meio da conversa

const MENU = '👇 Escolha uma opção:\n\n1️⃣  Fazer pedido\n2️⃣  Acompanhar pedido\n3️⃣  Ver cardápio\n4️⃣  Falar com atendente'

export const CONVERSA_CLIENTE = {
  contato: 'Brasa Burger',
  rotulo: 'Simulação do atendimento automático no WhatsApp do cliente',
  mensagens: [
    { de: 'cliente', texto: 'Oi, boa noite!' },
    { de: 'loja', texto: 'Olá! Bem-vindo ao *Brasa Burger* 🔥 Como posso ajudar?' },
    { de: 'loja', texto: MENU },
    { de: 'cliente', texto: '1' },
    { de: 'loja', texto: '📋 Monte seu pedido no nosso cardápio digital:\neucardapio.com.br/r/brasa-burger', link: { titulo: 'Brasa Burger — Cardápio digital', url: 'eucardapio.com.br' } },
    { aviso: 'Cliente monta o pedido no cardápio digital' },
    { de: 'loja', texto: '✅ *Pedido #A3F91C confirmado!*\n\n1x Smash Duplo — R$ 32,90\n1x Batata Rústica — R$ 18,90\n1x Refrigerante lata — R$ 6,90\n\n🛵 Taxa de entrega: R$ 6,00\n💰 *Total: R$ 64,70*\n\n💳 Pagamento: Crédito na entrega\nO entregador levará a maquininha.\n\n⏱️ Acompanhe seu pedido respondendo *2* no menu.' },
    { de: 'loja', texto: '👨‍🍳 Seu pedido está sendo preparado!' },
    { de: 'loja', texto: '🛵 Seu pedido saiu para entrega! Já já chega.' },
    { de: 'loja', texto: '🛵 Você é a próxima entrega! Seu pedido #A3F91C já está a caminho.' },
    { de: 'loja', texto: '📍 O entregador chegou! Seu pedido #A3F91C está te esperando.' },
    { de: 'loja', texto: '🎉 Pedido entregue! Obrigado pela preferência.' },
  ],
}

export const CONVERSA_ENTREGADOR = {
  contato: 'Brasa Burger',
  subtitulo: 'Entregas',
  rotulo: 'Simulação do entregador recebendo as entregas no WhatsApp',
  mensagens: [
    { aviso: 'Restaurante clicou em "Enviar lista" no painel' },
    { de: 'loja', texto: '🛵 *Suas entregas:*\n\n1️⃣ Pedido #A3F91C — Rua das Flores, 123\n2️⃣ Pedido #B7D204 — Av. Central, 456\n\nDigite o número do pedido para ver os detalhes.\nA qualquer momento, digite *entregas* para ver essa lista de novo.' },
    { de: 'cliente', texto: '1' },
    { de: 'loja', texto: '📦 *Pedido #A3F91C*\n\n👤 Cliente: Ana Souza\n\n📍 Endereço:\nRua das Flores, 123 — Jardim América\nReferência: Portão azul\n\n📌 Localização: maps.google.com/?q=-23.56,-46.66\n\n💰 Total: R$ 64,70\n\nO que deseja fazer?\n\n1️⃣ Próxima entrega\n2️⃣ Cheguei no local\n3️⃣ Entregue\n0️⃣ Voltar', mapa: true },
    { de: 'cliente', texto: '1' },
    { de: 'loja', texto: '✅ Marcado como próxima entrega.' },
    { aviso: 'Cliente avisado: "Você é a próxima entrega!"' },
    { de: 'cliente', texto: '2' },
    { de: 'loja', texto: '✅ Marcado como "cheguei no local".' },
    { aviso: 'Cliente avisado: "O entregador chegou!"' },
    { de: 'cliente', texto: '3' },
    { de: 'loja', texto: '✅ Entrega #A3F91C concluída! 🎉' },
    { aviso: 'Pedido finalizado no painel' },
    { de: 'loja', texto: '🛵 *Suas entregas:*\n\n1️⃣ Pedido #B7D204 — Av. Central, 456\n\nDigite o número do pedido para ver os detalhes.' },
  ],
}

export const CONVERSA_PIX = {
  contato: 'Brasa Burger',
  rotulo: 'Simulação do pagamento por Pix com chave e envio do comprovante no WhatsApp',
  mensagens: [
    { aviso: 'Pedido feito no cardápio digital' },
    { de: 'loja', texto: '✅ *Pedido #C21E77 confirmado!*\n\n1x Pizza Calabresa — R$ 54,90\n1x Suco de laranja — R$ 9,90\n\n🛵 Taxa de entrega: R$ 6,00\n💰 *Total: R$ 70,80*\n\n💳 Pagamento: Pix com chave\n🔑 Chave: pix@brasaburger.com.br\n💰 Valor: R$ 70,80\n\nApós o pagamento, envie o comprovante *aqui* para confirmação.\n\n⏱️ Acompanhe seu pedido respondendo *2* no menu.' },
    { de: 'cliente', comprovante: true },
    { de: 'loja', texto: 'Arquivo recebido com sucesso, aguarde a confirmação do pagamento.' },
    { aviso: 'Restaurante confere e confirma no painel' },
    { de: 'loja', texto: '✅ Pagamento confirmado! O restaurante já foi avisado e vai iniciar o preparo em breve. 👨‍🍳' },
    { de: 'loja', texto: '👨‍🍳 Seu pedido está sendo preparado!' },
  ],
}

export const CONVERSA_ATENDENTE = {
  contato: 'Brasa Burger',
  rotulo: 'Simulação da transferência para um atendente no WhatsApp',
  mensagens: [
    { de: 'cliente', texto: 'Boa tarde' },
    { de: 'loja', texto: 'Olá! Bem-vindo ao *Brasa Burger* 🔥 Como posso ajudar?' },
    { de: 'loja', texto: MENU },
    { de: 'cliente', texto: '4' },
    { de: 'loja', texto: '👤 Transferindo para um atendente. Por favor, aguarde um momento...' },
    { aviso: 'O restaurante assume a conversa' },
    { de: 'atendente', texto: 'Oi, Ana! Aqui é a Marina. Em que posso ajudar?' },
    { de: 'cliente', texto: 'Vocês fazem festa de aniversário?' },
    { de: 'atendente', texto: 'Fazemos sim! Te mando as opções agora 😊' },
  ],
}

export const CONVERSA_FECHADO = {
  contato: 'Brasa Burger',
  rotulo: 'Simulação da mensagem automática fora do horário',
  mensagens: [
    { de: 'cliente', texto: 'Vocês estão abertos?' },
    { de: 'loja', texto: 'Olá! No momento estamos fechados. Em breve retornaremos. 🙏' },
    { aviso: 'Fora do horário, o cardápio não aceita pedidos' },
  ],
}
