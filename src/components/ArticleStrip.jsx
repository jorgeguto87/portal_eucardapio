import { useEffect, useState } from 'react'
import { loadArticles, relatedTo, fmtDate } from '../lib/articles'

// "Últimos artigos" (sem keywords) ou "Artigos relacionados" (com keywords).
// Some sozinha quando não há artigos para mostrar.
export default function ArticleStrip({ keywords, eyebrow = 'Blog', title = 'Últimos artigos', className = '' }) {
  const [list, setList] = useState([])
  const key = (keywords || []).join('|')

  useEffect(() => {
    let alive = true
    loadArticles().then((all) => {
      if (!alive) return
      setList(keywords?.length ? relatedTo(all, keywords) : all.slice(0, 3))
    })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  if (!list.length) return null

  return (
    <section className={`mx-auto max-w-5xl px-6 md:px-10 ${className}`}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.2em] text-ember-dark">{eyebrow}</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.3rem,5vw,2rem)] font-semibold text-ink">{title}</h2>
        </div>
        <a href="/blog" className="text-sm font-semibold text-ember-dark hover:underline">Ver todos os artigos →</a>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {list.map((a) => (
          <a key={a.slug} href={`/blog/${encodeURIComponent(a.slug)}`} className="group flex min-w-0 flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-transform hover:-translate-y-1">
            {a.publishedAt && <span className="text-xs font-semibold text-ember-dark">{fmtDate(a.publishedAt)}</span>}
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-ink break-words">{a.title}</h3>
            {a.excerpt && <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft/80 line-clamp-3">{a.excerpt}</p>}
            <span className="mt-4 text-sm font-semibold text-ember-dark">Ler artigo →</span>
          </a>
        ))}
      </div>
    </section>
  )
}
