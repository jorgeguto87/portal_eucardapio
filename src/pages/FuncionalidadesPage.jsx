import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  {
    id: 'cardapio-digital',
    tag: 'cardápio digital',
    title: 'Seu cardápio, do jeito que você sempre quis mostrar',
    body: 'Fotos, categorias organizadas, banners de destaque pro prato do dia ou aquela promoção que não pode passar batida. O cliente vê exatamente o que você quer que ele veja.',
    images: [{ src: '/funcionalidades/cardapio-digital.png', alt: 'Cardápio digital no celular' }],
  },
  {
    id: 'gestao-cardapio',
    tag: 'gestão de cardápio',
    title: 'Editar seu cardápio não devia ser complicado — e não é',
    body: 'Opcionais, adicionais, favoritos prontos pra aplicar em vários produtos de uma vez. Muda um preço, ativa ou desativa um item, e pronto — reflete na hora pro cliente.',
    images: [{ src: '/funcionalidades/montagem-cardapio-pc.png', alt: 'Montagem do cardápio no computador' }],
  },
  {
    id: 'whatsapp-automatico',
    tag: 'whatsapp automático',
    title: 'O atendimento que nunca faz seu cliente esperar',
    body: 'Um chatbot integrado ao seu restaurante, com a cara da sua loja — não um robô genérico e complicado. Atende quantos clientes precisar, ao mesmo tempo, sem fila e sem demora. Cardápio, pedido, pagamento e acompanhamento até a porta — tudo pelo mesmo canal que seu cliente já usa todo dia.',
    images: [{ src: '/funcionalidades/tela-bot-pc.png', alt: 'Personalização do bot no computador' }],
  },
  {
    id: 'pagamento',
    tag: 'pagamento sem intermediário',
    title: 'O dinheiro do seu pedido é seu — literalmente',
    body: 'Escolha entre Mercado Pago ou InfinitePay e em breve mais opções para você: o pagamento cai direto na sua própria conta, sem passar pela nossa, sem prazo de repasse, sem comissão por venda.',
    images: [{ src: '/funcionalidades/tela-pagamentos-pc.png', alt: 'Contas de pagamento conectáveis' }],
  },
  {
    id: 'entrega',
    tag: 'entrega organizada',
    title: "Do 'saiu pra entrega' até a campainha tocar",
    body: 'Seu entregador recebe a rota pelo próprio WhatsApp, avisa quando está a caminho e quando chega — e o cliente acompanha cada aviso em tempo real, sem precisar perguntar "cadê meu pedido?"',
    images: [
      { src: '/funcionalidades/fila-entregas-zap.png', alt: 'Fila de entregas do entregador no WhatsApp', label: 'O entregador vê a fila' },
      { src: '/funcionalidades/entregador.png', alt: 'Detalhe do pedido com localização e ações', label: 'E o detalhe de cada entrega' },
      { src: '/funcionalidades/cliente-whatsapp-mockup.png', alt: 'O cliente acompanhando pelo WhatsApp', label: 'O cliente acompanha em tempo real' },
    ],
    wide: true,
  },
  {
    id: 'painel',
    tag: 'painel completo',
    title: 'Tudo que acontece no seu restaurante, numa tela só',
    body: 'Pedido novo, faturamento do dia, entregadores em rota — sem precisar abrir 5 telas diferentes pra saber o que está rolando agora. Funciona igual no computador do balcão e no celular do seu bolso.',
    images: [{ src: '/funcionalidades/tele-inicio-pc.png', alt: 'Visão geral do painel no computador' }],
  },
]

export default function FuncionalidadesPage() {
  const scope = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.func-hero > *', { opacity: 0, y: 24, stagger: 0.1, duration: 0.7 })

      gsap.utils.toArray('.func-section').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })
    }, scope)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={scope} className="pt-28 pb-24">
      {/* Abertura — a imagem principal, PC + celular juntos, em destaque */}
      <section className="func-hero mx-auto max-w-5xl px-6 text-center md:px-10">
        <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.2em] text-ember-dark">
          Funcionalidades
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.7rem,6.5vw,3rem)] font-semibold leading-tight text-ink">
          No computador do balcão.<br className="hidden sm:block" /> No celular do seu bolso.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-ink-soft/80 sm:text-lg">
          Gerencie de onde estiver — o Eu Cardápio se adapta ao seu dia, não o contrário.
        </p>
        <img
          src="/funcionalidades/principal.png"
          alt="Eu Cardápio funcionando no computador e no celular"
          className="mx-auto mt-10 w-full max-w-3xl"
        />
      </section>

      {/* Seções */}
      <div className="mx-auto mt-24 max-w-5xl space-y-24 px-6 md:px-10">
        {SECTIONS.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`func-section grid items-center gap-10 ${
              s.wide ? '' : `md:grid-cols-2 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`
            }`}
          >
            {!s.wide && (
              <>
                <div>
                  <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.15em] text-ember-dark">
                    {s.tag}
                  </span>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.25rem,5vw,1.875rem)] font-semibold leading-tight text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft/80">{s.body}</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-xl">
                  <img src={s.images[0].src} alt={s.images[0].alt} className="w-full" />
                </div>
              </>
            )}

            {s.wide && (
              <>
                <div className="mb-10 text-center">
                  <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.15em] text-ember-dark">
                    {s.tag}
                  </span>
                  <h2 className="mx-auto mt-3 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.25rem,5vw,1.875rem)] font-semibold leading-tight text-ink">
                    {s.title}
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft/80">{s.body}</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-3">
                  {s.images.map((img) => (
                    <div key={img.src}>
                      <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-wide text-ink-soft/60">{img.label}</p>
                      <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-xl">
                        <img src={img.src} alt={img.alt} className="w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        ))}
      </div>

      {/* CTA final */}
      <div className="mx-auto mt-24 max-w-2xl px-6 text-center md:px-10">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          Seu restaurante precisa disso.
        </h3>
        <a
          href="/#comecar"
          className="mt-6 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-ink-soft"
        >
          Comece grátis por 7 dias
        </a>
      </div>
    </div>
  )
}
