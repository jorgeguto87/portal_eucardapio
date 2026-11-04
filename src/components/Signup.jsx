import { useState } from 'react'
import { signup, PAINEL_URL } from '../lib/api'
import { maskDocument, maskPhone } from '../lib/mask'
import { Check } from 'lucide-react'
import { Reveal } from './ui'
import { INCLUI } from './blocks'

const initialForm = {
  name: '',
  document: '',
  phone: '',
  adminName: '',
  adminEmail: '',
  adminPassword: '',
}

export default function Signup() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const update = (field) => (e) => {
    let value = e.target.value
    if (field === 'document') value = maskDocument(value)
    if (field === 'phone') value = maskPhone(value)
    setForm((f) => ({ ...f, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const result = await signup(form)
      setSuccess(result)
      // Guarda os tokens e já manda pro painel logado — o cadastro termina
      // com o restaurante dentro do próprio sistema, não numa tela de
      // "cadastro concluído, agora faça login".
      const params = new URLSearchParams({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      })
      window.location.href = `${PAINEL_URL}/auth/from-signup?${params.toString()}`
    } catch (err) {
      const message = err.response?.data?.error?.message || 'Não foi possível criar sua conta. Confira os dados e tenta de novo.'
      setError(message)
      setLoading(false)
    }
  }

  return (
    <section id="comecar" className="scroll-mt-16 bg-paper-dim px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow mb-4 text-ember-dark">Comece agora</p>
          <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-semibold leading-[1.08]">Seu cardápio no ar hoje</h2>
          <p className="mt-5 max-w-md text-lg text-ink-soft/80">
            7 dias grátis, sem cartão de crédito. Depois, R$ 129,90 por mês, sem comissão por pedido. Cancele quando quiser.
          </p>
          <ul className="mt-8 grid gap-2.5 text-sm text-ink-soft/85 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {INCLUI.slice(0, 8).map((t) => (
              <li key={t} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-cash" aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </Reveal>

        <form onSubmit={handleSubmit} className="rounded-[24px] border border-ink/10 bg-white p-6 shadow-soft space-y-5 sm:p-9">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink-soft mb-1.5">Nome do restaurante</label>
            <input
              id="name" required value={form.name} onChange={update('name')}
              placeholder="Pizzaria do Zé"
              className="w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="document" className="block text-sm font-medium text-ink-soft mb-1.5">CPF ou CNPJ</label>
              <input
                id="document" required value={form.document} onChange={update('document')}
                placeholder="000.000.000-00"
                className="w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-ink-soft mb-1.5">WhatsApp do restaurante</label>
              <input
                id="phone" required value={form.phone} onChange={update('phone')}
                placeholder="(21) 99999-9999"
                className="w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-dashed border-ink/10">
            <p className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-ink-soft/50 mb-4 mt-5">Dados de acesso</p>
          </div>

          <div>
            <label htmlFor="adminName" className="block text-sm font-medium text-ink-soft mb-1.5">Seu nome</label>
            <input
              id="adminName" required value={form.adminName} onChange={update('adminName')}
              placeholder="Como podemos te chamar"
              className="w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="adminEmail" className="block text-sm font-medium text-ink-soft mb-1.5">Seu e-mail</label>
            <input
              id="adminEmail" type="email" required value={form.adminEmail} onChange={update('adminEmail')}
              placeholder="voce@email.com"
              className="w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="adminPassword" className="block text-sm font-medium text-ink-soft mb-1.5">Crie uma senha</label>
            <input
              id="adminPassword" type="password" required minLength={8} value={form.adminPassword} onChange={update('adminPassword')}
              placeholder="Pelo menos 8 caracteres"
              className="w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ember shadow-glow hover:bg-ember-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-semibold rounded-full px-6 py-4 mt-2"
          >
            {loading ? 'Criando sua conta...' : 'Criar meu cardápio grátis'}
          </button>

          <p className="text-center text-xs text-ink-soft/60">
            Já tem conta? <a href={PAINEL_URL} className="text-ember-dark font-medium hover:underline">Entrar no painel</a>
          </p>
        </form>
      </div>
    </section>
  )
}
