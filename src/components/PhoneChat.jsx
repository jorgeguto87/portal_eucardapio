import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowLeft, CheckCheck, FileImage, MapPin, Phone, Video } from 'lucide-react'
import { cn } from './ui'

// Tempo até cada mensagem aparecer (ms). Respostas do robô mostram
// "digitando…" antes; mensagens longas esperam um pouco mais.
const delayFor = (m) => {
  if (m.aviso) return 900
  if (m.de === 'cliente') return 1100
  const len = (m.texto || '').length
  return Math.min(2300, 900 + len * 6)
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    setReduced(mq.matches)
    const on = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return reduced
}

/**
 * Telefone com uma conversa de WhatsApp que se desenrola sozinha, em
 * loop, enquanto está visível na tela. Com "reduzir movimento" ligado,
 * mostra a conversa inteira parada (com rolagem).
 */
export default function PhoneChat({ conversa, className, hora = 19 }) {
  const { mensagens, contato, subtitulo, rotulo } = conversa
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') { setVisible(true); return }
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !visible) return
    let t
    if (count >= mensagens.length) {
      t = setTimeout(() => setCount(0), 4200)
      return () => clearTimeout(t)
    }
    const next = mensagens[count]
    const isBot = next.de === 'loja' || next.de === 'atendente'
    const wait = count === 0 ? 700 : delayFor(next)
    if (isBot) {
      t = setTimeout(() => setTyping(true), Math.max(250, wait - 850))
    }
    const t2 = setTimeout(() => { setTyping(false); setCount((c) => c + 1) }, wait)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [count, visible, reduced, mensagens])

  const shown = reduced ? mensagens : mensagens.slice(0, count)

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={rotulo}
      className={cn('relative w-[290px] shrink-0 rounded-[46px] border-[10px] border-[#0d0d16] bg-[#0d0d16] shadow-phone sm:w-[300px]', className)}
    >
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0d0d16]" />
      <div className="overflow-hidden rounded-[36px] bg-wa-bg" aria-hidden="true">
        <div className="flex items-center gap-2 bg-wa px-3 pb-2.5 pt-8 text-white">
          <ArrowLeft className="h-4 w-4 opacity-90" />
          <img src="/telas/brasa-logo.webp" alt="" width="32" height="32" className="h-8 w-8 rounded-full bg-[#1E120C] object-cover" />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[13px] font-semibold">{contato}</p>
            <p className="text-[11px] opacity-80">{typing ? 'digitando…' : subtitulo || 'online'}</p>
          </div>
          <Video className="h-4 w-4 opacity-90" />
          <Phone className="ml-2 h-4 w-4 opacity-90" />
        </div>
        <div
          className={cn(
            'flex h-[500px] flex-col gap-1.5 px-2.5 py-3 text-[12px] leading-snug text-[#111b21] sm:h-[520px]',
            reduced ? 'no-scrollbar overflow-y-auto' : 'justify-end overflow-hidden',
          )}
          style={{ backgroundImage: 'radial-gradient(rgb(0 0 0 / 0.035) 1px, transparent 1px)', backgroundSize: '14px 14px' }}
        >
          {shown.map((m, i) => <Bubble key={i} m={m} hora={`${hora}:${String(20 + i).padStart(2, '0')}`} />)}
          {typing && (
            <div className="animate-msg w-14 shrink-0 self-start rounded-xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm">
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => <span key={d} className="typing-dot h-1.5 w-1.5 rounded-full bg-[#8696a0]" style={{ animationDelay: `${d * 150}ms` }} />)}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 bg-wa-bg px-2.5 pb-4 pt-1">
          <div className="h-9 flex-1 rounded-full bg-white px-4 text-[12px] leading-9 text-[#8696a0]">Mensagem</div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#00A884] text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/** *negrito* do WhatsApp → <strong>. */
function WhatsText({ text }) {
  return text.split(/(\*[^*\n]+\*)/g).map((part, i) =>
    part.length > 2 && part.startsWith('*') && part.endsWith('*')
      ? <strong key={i}>{part.slice(1, -1)}</strong>
      : <Fragment key={i}>{part}</Fragment>,
  )
}

function Bubble({ m, hora }) {
  if (m.aviso) {
    return (
      <p className="animate-msg my-1 shrink-0 self-center rounded-lg bg-[#FFF3C4] px-2.5 py-1 text-center text-[10.5px] font-semibold text-[#54656f] shadow-sm">
        {m.aviso}
      </p>
    )
  }
  const mine = m.de === 'cliente'
  return (
    <div className={cn('animate-msg relative max-w-[88%] shrink-0 break-words rounded-xl px-2.5 py-1.5 shadow-sm', mine ? 'self-end rounded-tr-sm bg-wa-bubble' : 'self-start rounded-tl-sm bg-white')}>
      {m.de === 'atendente' && <p className="mb-0.5 text-[11px] font-semibold text-[#E05520]">Marina · atendente</p>}
      {m.link && (
        <div className="mb-1.5 overflow-hidden rounded-lg bg-[#f0f2f5]">
          <img src="/telas/cardapio-celular.webp" alt="" width="780" height="1688" loading="lazy" className="h-24 w-full object-cover object-top" />
          <div className="px-2 py-1.5">
            <p className="text-[11px] font-semibold">{m.link.titulo}</p>
            <p className="text-[10px] text-[#667781]">{m.link.url}</p>
          </div>
        </div>
      )}
      {m.mapa && (
        <div className="relative mb-1.5 h-24 overflow-hidden rounded-lg bg-[#E8EEE4]">
          <svg viewBox="0 0 240 96" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
            <rect width="240" height="96" fill="#EAF0E6" />
            <path d="M0 62 L240 40" stroke="#fff" strokeWidth="9" />
            <path d="M70 0 L96 96" stroke="#fff" strokeWidth="7" />
            <path d="M160 0 L176 96" stroke="#FCE7B2" strokeWidth="8" />
            <rect x="10" y="8" width="44" height="30" rx="4" fill="#D7E6CF" />
            <rect x="190" y="58" width="40" height="28" rx="4" fill="#CFE3F5" />
          </svg>
          <MapPin className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-[85%] fill-[#EA4335] text-white" />
        </div>
      )}
      {m.comprovante ? (
        <div className="flex w-44 items-center gap-2 rounded-lg bg-[#c7ebb0] p-2">
          <FileImage className="h-8 w-8 shrink-0 text-[#00A884]" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold">comprovante-pix.jpg</p>
            <p className="text-[10px] text-[#667781]">Imagem · 182 kB</p>
          </div>
        </div>
      ) : (
        <span className="whitespace-pre-line"><WhatsText text={m.texto} /></span>
      )}
      <span className="float-right ml-2 mt-1 inline-flex translate-y-0.5 items-center gap-0.5 text-[9.5px] text-[#667781]">
        {hora} {mine && <CheckCheck className="h-3 w-3 text-wa-tick" />}
      </span>
    </div>
  )
}
