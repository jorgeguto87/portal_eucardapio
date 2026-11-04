import { cn } from './ui'

/**
 * Tela real do Eu Cardápio (restaurante fictício). Imagens em /public/telas:
 * <nome>-desktop.webp (1600x1000) e <nome>-celular.webp (780x1688).
 *
 * show: "desktop" = moldura de navegador; "mobile" = moldura de telefone;
 *       "auto" = navegador no computador e telefone no celular (cada aparelho
 *       baixa só a sua, porque a imagem escondida com lazy não é baixada).
 */
export function BrowserFrame({ name, alt, url = 'painel.eucardapio.com.br', className, eager = false }) {
  return (
    <div className={cn('w-full overflow-hidden rounded-[18px] border border-ink/10 bg-white shadow-soft', className)}>
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-paper-dim/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-ink-soft/70">{url}</span>
      </div>
      <img
        src={`/telas/${name}-desktop.webp`} alt={alt} width="1600" height="1000"
        loading={eager ? 'eager' : 'lazy'} decoding="async" className="block h-auto w-full"
      />
    </div>
  )
}

export function PhoneFrame({ name, alt, className, eager = false }) {
  return (
    <div className={cn('w-[250px] shrink-0 overflow-hidden rounded-[40px] border-[9px] border-[#0d0d16] bg-[#0d0d16] shadow-phone sm:w-[270px]', className)}>
      <img
        src={`/telas/${name}-celular.webp`} alt={alt} width="780" height="1688"
        loading={eager ? 'eager' : 'lazy'} decoding="async" className="block h-auto w-full rounded-[31px]"
      />
    </div>
  )
}

export function ScreenShot({ name, alt, url, show = 'desktop', className }) {
  if (show === 'mobile') return <PhoneFrame name={name} alt={alt} className={className} />
  if (show === 'desktop') return <BrowserFrame name={name} alt={alt} url={url} className={className} />
  return (
    <div className={className}>
      <BrowserFrame name={name} alt={alt} url={url} className="hidden lg:block" />
      <PhoneFrame name={name} alt={alt} className="lg:hidden" />
    </div>
  )
}
