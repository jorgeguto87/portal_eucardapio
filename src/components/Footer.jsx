export default function Footer() {
  const year = new Date().getFullYear()

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

          <div className="flex gap-16">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-widest uppercase text-paper/40 mb-3">Produto</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#topo" className="hover:text-paper transition-colors">Início</a></li>
                <li><a href="#comecar" className="hover:text-paper transition-colors">Comece grátis</a></li>
              </ul>
            </div>
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-widest uppercase text-paper/40 mb-3">Conta</p>
              <ul className="space-y-2 text-sm">
                <li><a href="https://paineleucardapio.devaugusto.com.br" className="hover:text-paper transition-colors">Entrar no painel</a></li>
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
