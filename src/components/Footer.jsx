import { Link } from 'react-router-dom'
import { FEATURES, SITE } from '../content/site'
import { Logo } from './ui'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink px-4 pb-10 pt-16 text-paper/70 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-paper/10 pb-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Cardápio digital, WhatsApp automático, entregas e pagamento direto na sua conta, num painel só. Sem comissão por pedido.
            </p>
            <Link to={SITE.signupHref} className="mt-6 inline-flex rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ember-dark">
              Começar {SITE.trialDays} dias grátis
            </Link>
          </div>
          <div>
            <p className="eyebrow mb-4 text-paper/40">Funcionalidades</p>
            <ul className="space-y-2.5 text-sm">
              {FEATURES.map((f) => <li key={f.slug}><Link to={`/${f.slug}`} className="transition hover:text-paper">{f.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-paper/40">Empresa</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/funcionalidades" className="transition hover:text-paper">Todas as funcionalidades</Link></li>
              <li><Link to="/precos" className="transition hover:text-paper">Preços</Link></li>
              <li><Link to="/sobre" className="transition hover:text-paper">Sobre</Link></li>
              <li><a href="/blog" className="transition hover:text-paper">Blog</a></li>
              <li><Link to="/contato" className="transition hover:text-paper">Contato</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-paper/40">Conta</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href={SITE.painelUrl} className="transition hover:text-paper">Entrar no painel</a></li>
              <li><Link to={SITE.signupHref} className="transition hover:text-paper">Criar conta grátis</Link></li>
              <li><a href={SITE.whatsapp} className="transition hover:text-paper">WhatsApp</a></li>
              <li><a href={`mailto:${SITE.email}`} className="transition hover:text-paper">{SITE.email}</a></li>
            </ul>
          </div>
        </div>
        <p className="pt-6 font-[family-name:var(--font-mono)] text-xs text-paper/40">© {year} Eu Cardápio — todos os direitos reservados</p>
      </div>
    </footer>
  )
}
