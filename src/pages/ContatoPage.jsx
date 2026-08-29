import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://portal.eucardapio.com.br'

export default function ContatoPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="pt-28 pb-24">
      <Helmet>
        <title>Contato — Fale com o Eu Cardápio</title>
        <meta name="description" content="Tem dúvida sobre o Eu Cardápio? Fale com a gente pelo WhatsApp ou e-mail. Respondemos rápido, sem robô." />
        <link rel="canonical" href={`${SITE_URL}/contato`} />
      </Helmet>

      <section className="mx-auto max-w-2xl px-6 text-center md:px-10">
        <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.2em] text-ember-dark">
          Contato
        </span>
        <h1 className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-display)] text-[clamp(1.7rem,6.5vw,3rem)] font-semibold leading-tight text-ink">
          Fale com a gente
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base text-ink-soft/80 sm:text-lg">
          Tem dúvida, sugestão ou quer tirar uma questão antes de começar? A gente responde rápido, sem robô.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-xl px-6 md:px-10">
        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          <a
            href="https://wa.me/5521999999999"
            className="rounded-2xl bg-paper-dim p-6 hover:bg-white transition-colors border border-ink/10"
          >
            <span className="text-2xl mb-3 block">💬</span>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink mb-1">WhatsApp</h3>
            <p className="text-sm text-ink-soft">Resposta em minutos, no horário comercial.</p>
          </a>
          <a
            href="mailto:contato@eucardapio.com.br"
            className="rounded-2xl bg-paper-dim p-6 hover:bg-white transition-colors border border-ink/10"
          >
            <span className="text-2xl mb-3 block">✉️</span>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink mb-1">E-mail</h3>
            <p className="text-sm text-ink-soft">contato@eucardapio.com.br</p>
          </a>
        </div>

        {sent ? (
          <div className="rounded-2xl bg-cash/10 border border-cash/20 p-8 text-center">
            <span className="text-3xl mb-3 block">✅</span>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink mb-2">Mensagem enviada!</h3>
            <p className="text-sm text-ink-soft">Vamos responder o mais rápido possível. Obrigado pelo contato.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-7 md:p-9 shadow-[0_20px_60px_-20px_rgba(26,26,46,0.15)] border border-ink/10 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink-soft mb-1.5">Seu nome</label>
              <input
                id="name" required value={form.name} onChange={update('name')}
                placeholder="Como podemos te chamar"
                className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-soft mb-1.5">Seu e-mail</label>
              <input
                id="email" type="email" required value={form.email} onChange={update('email')}
                placeholder="voce@email.com"
                className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink-soft mb-1.5">Mensagem</label>
              <textarea
                id="message" required value={form.message} onChange={update('message')} rows={5}
                placeholder="Como podemos ajudar?"
                className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-ember hover:bg-ember-dark transition-colors text-white font-semibold rounded-full px-6 py-4"
            >
              Enviar mensagem
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
