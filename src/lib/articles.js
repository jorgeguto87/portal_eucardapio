// Artigos do blog para as páginas do portal. Vem de /api/artigos (mesmo domínio, função da Vercel),
// buscado uma vez por visita. Se falhar, as seções de artigos simplesmente não aparecem.

let pending = null

export function loadArticles() {
  if (!pending) {
    pending = fetch('/api/artigos', { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : { articles: [] }))
      .then((d) => (Array.isArray(d.articles) ? d.articles : []))
      .catch(() => [])
    pending.then((list) => { if (!list.length) pending = null })
  }
  return pending
}

const fold = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

// Artigos que falam do assunto da página (palavra-chave principal pesa mais).
export function relatedTo(articles, keywords, limit = 3) {
  const keys = keywords.map(fold)
  return articles
    .map((a) => {
      const hay = fold(`${a.title} ${a.focusKeyword} ${a.excerpt}`)
      const kw = fold(a.focusKeyword)
      const score = keys.reduce((n, k) => n + (hay.includes(k) ? (kw.includes(k) ? 3 : 1) : 0), 0)
      return { a, score }
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || String(y.a.publishedAt).localeCompare(String(x.a.publishedAt)))
    .slice(0, limit)
    .map((x) => x.a)
}

export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' }) : '')
