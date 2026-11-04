import { useState } from 'react'
import { CheckCircle2, Mail, MessageCircle } from 'lucide-react'
import { sendContactMessage } from '../lib/api'
import { SITE } from '../content/site'
import { PageHero } from '../components/ui'

export default function ContatoPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState(null)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro(null)
    setEnviando(true)
    try {
      await sendContactMessage(form)
      setSent(true)
    } catch (err) {
      // Mostra o erro de verdade — nunca finge sucesso quando o envio
      // realmente falhou (era exatamente esse o bug antes desse ajuste)
      setErro(
        err.response?.data?.error?.message ||
        'Não foi possível enviar sua mensagem agora. Tenta pelo WhatsApp, por favor.'
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main>
      <PageHero eyebrow="Contato" title="Fale com a gente" subtitle="Tem dúvida ou quer saber se o Eu Cardápio serve para o seu restaurante? Mande uma mensagem." />

      <section className="relative mx-auto -mt-10 max-w-xl px-4 pb-24 sm:px-8">
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <a href={SITE.whatsapp} className="rounded-[22px] border border-ink/10 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/40">
            <MessageCircle className="mb-3 h-6 w-6 text-ember-dark" aria-hidden="true" />
            <h2 className="font-[family-name:var(--font-sans)] text-lg font-bold tracking-tight">WhatsApp</h2>
            <p className="text-sm text-ink-soft/75">Resposta no horário comercial.</p>
          </a>
          <a href={`mailto:${SITE.email}`} className="rounded-[22px] border border-ink/10 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/40">
            <Mail className="mb-3 h-6 w-6 text-ember-dark" aria-hidden="true" />
            <h2 className="font-[family-name:var(--font-sans)] text-lg font-bold tracking-tight">E-mail</h2>
            <p className="break-all text-sm text-ink-soft/75">{SITE.email}</p>
          </a>
        </div>

        {sent ? (
          <div className="rounded-2xl bg-cash/10 border border-cash/20 p-8 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-cash" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-ink mb-2">Mensagem enviada!</h2>
            <p className="text-sm text-ink-soft">Vamos responder o mais rápido possível. Obrigado pelo contato.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-[24px] bg-white p-6 sm:p-9 shadow-soft border border-ink/10 space-y-5">
            {erro && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {erro}
              </div>
            )}
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
              disabled={enviando}
              className="w-full bg-ember shadow-glow hover:bg-ember-dark transition-colors text-white font-semibold rounded-full px-6 py-4 disabled:opacity-60"
            >
              {enviando ? 'Enviando...' : 'Enviar mensagem'}
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
