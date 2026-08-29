import { Link, useNavigate, useLocation } from 'react-router-dom'
import { PAINEL_URL } from '../lib/api'

export default function Footer() {
  const year = new Date().getFullYear()
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToSignup = (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById('comecar')?.scrollIntoView({ behavior: 'smooth' }), 100)
      return
    }
    document.getElementById('comecar')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-ink text-paper/70 px-6 md:px-10 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 pb-10 border-b border-dashed border-paper/15">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/favicon.png" alt="" className="w-8 h-8 rounded-lg" />
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-paper">
                Eu Cardápio
              </p>
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Cardápio digital, WhatsApp automático e pagamento direto na conta —
              tudo num painel só, sem depender de terceiro.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 md:gap-16">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-widest uppercase text-paper/40 mb-3">Funcionalidades</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/cardapio-digital" className="hover:text-paper transition-colors">Cardápio Digital</Link></li>
                <li><Link to="/pedido-whatsapp" className="hover:text-paper transition-colors">Pedido pelo WhatsApp</Link></li>
                <li><Link to="/pagamento-online" className="hover:text-paper transition-colors">Pagamento Online</Link></li>
                <li><Link to="/qr-code-mesa" className="hover:text-paper transition-colors">QR Code na Mesa</Link></li>
                <li><Link to="/sistema-delivery" className="hover:text-paper transition-colors">Sistema de Delivery</Link></li>
                <li><Link to="/cashback-fidelizacao" className="hover:text-paper transition-colors">Cashback e Fidelização</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-widest uppercase text-paper/40 mb-3">Empresa</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/precos" className="hover:text-paper transition-colors">Preços</Link></li>
                <li><Link to="/sobre" className="hover:text-paper transition-colors">Sobre</Link></li>
                <li><Link to="/blog" className="hover:text-paper transition-colors">Blog</Link></li>
                <li><Link to="/contato" className="hover:text-paper transition-colors">Contato</Link></li>
                <li><Link to="/funcionalidades" className="hover:text-paper transition-colors">Todas as funcionalidades</Link></li>
                <li><a href="#comecar" onClick={scrollToSignup} className="hover:text-paper transition-colors">Comece grátis</a></li>
              </ul>
            </div>
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-widest uppercase text-paper/40 mb-3">Conta</p>
              <ul className="space-y-2 text-sm">
                <li><a href={PAINEL_URL} className="hover:text-paper transition-colors">Entrar no painel</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-[family-name:var(--font-mono)] text-xs text-paper/40">
          <span>© {year} Eu Cardápio — todos os direitos reservados</span>
          <span>obrigado pela preferência ·</span>
        </div>
      </div>
    </footer>
  )
}
