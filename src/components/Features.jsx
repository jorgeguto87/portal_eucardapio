import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    tag: 'pagamento',
    title: 'Sem comissão por pedido',
    body: 'Você paga uma assinatura fixa, não uma porcentagem de cada venda. Vendeu mais, o custo continua o mesmo.',
  },
  {
    tag: 'dinheiro',
    title: 'Pix e cartão na sua conta',
    body: 'O cliente paga, o valor vai direto pra sua conta bancária — nunca fica retido esperando repasse de terceiro.',
  },
  {
    tag: 'cardápio',
    title: 'Opcionais e adicionais de verdade',
    body: 'Ponto da carne, molho, borda recheada — organizado por categoria, do jeito que faz sentido pro seu cardápio.',
  },
  {
    tag: 'mesa',
    title: 'QR Code na mesa, pedido sem garçom',
    body: 'O mesmo cardápio, agora também pro salão — cliente escaneia, pede, e o pedido cai direto na cozinha. Sem papel, sem confusão de comanda.',
  },
  {
    tag: 'fidelização',
    title: 'Cupons e cashback que trazem o cliente de volta',
    body: 'Crie promoções do seu jeito — desconto ou item grátis — e deixe o cliente acumular cashback pra próxima compra. Você decide as regras, o sistema cuida do resto.',
  },
  {
    tag: 'equipe',
    title: 'Sua equipe, com o acesso certo',
    body: 'Admin vê tudo, equipe de operação vê só o que precisa pra trabalhar. Sem gente mexendo onde não devia.',
  },
  {
    tag: 'entrega',
    title: 'Fila de entrega organizada',
    body: 'Atribui pedido pro entregador, acompanha em tempo real, sem grupo de WhatsApp bagunçado pra coordenar.',
  },
  {
    tag: 'financeiro',
    title: 'Faturamento sem letras miúdas',
    body: 'Relatório claro do que entrou, quando entrou, e por qual forma de pagamento — sem precisar decifrar planilha.',
  },
]

export default function Features() {
  const scope = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.feature-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: (i % 3) * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, scope)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={scope} className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase text-ember-dark mb-4">
          O que vem incluído
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.7rem,6vw,3rem)] font-semibold text-ink tracking-tight mb-16 max-w-2xl">
          Tudo que um restaurante precisa pra parar de depender de terceiro
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 rounded-2xl overflow-hidden">
          {FEATURES.map((f) => (
            <div key={f.tag} className="feature-card bg-paper p-8 hover:bg-white transition-colors">
              <span className="inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-ember-dark bg-ember/10 rounded-full px-2.5 py-1 mb-5">
                {f.tag}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink mb-2.5 leading-snug">
                {f.title}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/funcionalidades"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-ember-dark transition-colors"
          >
            Ver todas as funcionalidades em detalhe →
          </Link>
        </div>
      </div>
    </section>
  )
}
