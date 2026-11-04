import PhoneChat from './PhoneChat'
import { BrowserFrame, PhoneFrame, ScreenShot } from './ScreenShot'
import { cn } from './ui'

const phoneOf = (p, alt, key) =>
  typeof p === 'string'
    ? <PhoneFrame key={key} name={p.replace(/-celular$/, '')} alt={alt} />
    : p.chat
      ? <PhoneChat key={key} conversa={p.chat} />
      : <PhoneFrame key={key} name={p.screen.replace(/-celular$/, '')} alt={p.alt || alt} />

/**
 * Desenha o visual de uma seção a partir do conteúdo:
 *   { chat }                     → telefone com conversa
 *   { screen, show, alt, url }   → tela real
 *   { desktop, phone, alt, url } → computador com telefone sobreposto
 *   { phones: [...] }            → dois telefones lado a lado
 */
export default function Visual({ v, className }) {
  if (!v) return null
  if (v.chat) return <div className={cn('flex justify-center', className)}><PhoneChat conversa={v.chat} /></div>
  if (v.screen) return <ScreenShot name={v.screen.replace(/-(desktop|celular)$/, '')} alt={v.alt} url={v.url} show={v.show} className={className} />
  if (v.phones) {
    return (
      <div className={cn('flex flex-wrap items-start justify-center gap-6 sm:flex-nowrap', className)}>
        {v.phones.map((p, i) => (
          <div key={i} className={cn(i === 1 && 'sm:mt-16')}>{phoneOf(p, p.alt, i)}</div>
        ))}
      </div>
    )
  }
  if (v.desktop) {
    // Computador atrás, telefone na frente (menor), sem cobrir a tela toda.
    return (
      <div className={cn('relative sm:pb-28 lg:pb-36', className)}>
        <BrowserFrame name={v.desktop.replace(/-desktop$/, '')} alt={v.alt} url={v.url} className="hidden sm:block sm:w-[86%]" />
        <div className="flex justify-center sm:absolute sm:bottom-0 sm:right-0 sm:block sm:origin-bottom-right sm:scale-[0.72] lg:scale-[0.8]">
          {phoneOf(v.phone, v.alt, 'p')}
        </div>
      </div>
    )
  }
  return null
}
