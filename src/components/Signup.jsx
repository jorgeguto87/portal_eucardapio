import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { signup, PAINEL_URL } from '../lib/api'
import { maskDocument, maskPhone } from '../lib/mask'

gsap.registerPlugin(ScrollTrigger)

const initialForm = {
  name: '',
  document: '',
  phone: '',
  adminName: '',
  adminEmail: '',
  adminPassword: '',
}

export default function Signup() {
  const scope = useRef(null)
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.signup-card', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.signup-card', start: 'top 82%' },
      })
    }, scope)
    return () => ctx.revert()
  }, [])

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
    <section id="comecar" ref={scope} className="py-24 md:py-32 px-6 md:px-10 bg-paper-dim">
      <div className="max-w-xl mx-auto">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase text-ember-dark mb-4 text-center">
          Comece agora
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.7rem,6vw,3rem)] font-semibold text-ink tracking-tight mb-4 text-center">
          Seu cardápio no ar hoje
        </h2>
        <p className="text-ink-soft text-center mb-12 max-w-md mx-auto">
          7 dias grátis, sem cartão de crédito.< br/>Depois disso, R$ 79,90 por mês< br/>Cancele quando quiser.
        </p>

        <form onSubmit={handleSubmit} className="signup-card bg-paper rounded-2xl p-7 md:p-9 shadow-[0_20px_60px_-20px_rgba(26,26,46,0.15)] space-y-5">
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
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="document" className="block text-sm font-medium text-ink-soft mb-1.5">CPF ou CNPJ</label>
              <input
                id="document" required value={form.document} onChange={update('document')}
                placeholder="000.000.000-00"
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-ink-soft mb-1.5">WhatsApp do restaurante</label>
              <input
                id="phone" required value={form.phone} onChange={update('phone')}
                placeholder="(21) 99999-9999"
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
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
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="adminEmail" className="block text-sm font-medium text-ink-soft mb-1.5">Seu e-mail</label>
            <input
              id="adminEmail" type="email" required value={form.adminEmail} onChange={update('adminEmail')}
              placeholder="voce@email.com"
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="adminPassword" className="block text-sm font-medium text-ink-soft mb-1.5">Crie uma senha</label>
            <input
              id="adminPassword" type="password" required minLength={8} value={form.adminPassword} onChange={update('adminPassword')}
              placeholder="Pelo menos 8 caracteres"
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-ember outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ember hover:bg-ember-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-semibold rounded-full px-6 py-4 mt-2"
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
