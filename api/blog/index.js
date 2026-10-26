// /blog (rewrite em vercel.json → /api/blog). Lista de artigos publicados,
// renderizada no servidor para o Google receber o HTML completo.
// Paginação: /blog?pagina=N (PAGE_SIZE por página).

import {
  SITE_URL, PAGE_SIZE, CACHE_OK, fetchArticles, ApiUnavailable, page, sendHtml, redirect,
  errorPage, parseUrl, breadcrumbSchema, breadcrumbHtml, publisher, articleCard, isoDate, escapeHtml,
} from '../_lib/blog.js'

const TITLE = 'Blog — Dicas para Restaurantes que Fazem Delivery | Eu Cardápio'
const DESCRIPTION = 'Dicas, tutoriais e estratégias para restaurantes que querem ter delivery próprio, vender mais pelo cardápio digital e parar de pagar comissão.'

const pageUrl = (n) => (n <= 1 ? `${SITE_URL}/blog` : `${SITE_URL}/blog?pagina=${n}`)
const pagePath = (n) => (n <= 1 ? '/blog' : `/blog?pagina=${n}`)

export default async function handler(req, res) {
  const url = parseUrl(req)

  // Forma canônica: /blog sem barra final e ?pagina só quando N > 1, em
  // número simples. Outros parâmetros (ex.: utm_*) são mantidos no redirect
  // e ignorados no canonical.
  const raw = url.searchParams.get('pagina')
  let n = 1
  let needsRedirect = /^\/blog\/+$/.test(url.pathname)
  if (raw !== null) {
    n = /^\d{1,4}$/.test(raw) ? parseInt(raw, 10) : NaN
    if (!Number.isFinite(n) || n < 1) { n = 1; needsRedirect = true }
    else if (n === 1 || String(n) !== raw) needsRedirect = true
  }
  if (needsRedirect) {
    const qs = new URLSearchParams(url.search)
    qs.delete('pagina')
    if (n > 1) qs.set('pagina', String(n))
    const q = qs.toString()
    return redirect(res, `/blog${q ? `?${q}` : ''}`)
  }

  let articles
  try {
    articles = await fetchArticles()
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      console.error('[blog] API do SEO indisponível:', err.message)
      return errorPage(res, 503)
    }
    throw err
  }

  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE))
  if (n > totalPages) return errorPage(res, 404)
  const items = articles.slice((n - 1) * PAGE_SIZE, n * PAGE_SIZE)

  const title = n > 1 ? `Blog — página ${n} | Eu Cardápio` : TITLE
  const canonical = pageUrl(n)
  const crumbs = [
    { name: 'Início', url: `${SITE_URL}/`, path: '/' },
    { name: 'Blog', url: `${SITE_URL}/blog`, path: '/blog' },
  ]

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#blog`,
      name: 'Blog do Eu Cardápio',
      description: DESCRIPTION,
      url: `${SITE_URL}/blog`,
      inLanguage: 'pt-BR',
      publisher,
      blogPost: items.map((a) => ({
        '@type': 'BlogPosting',
        headline: a.title,
        url: `${SITE_URL}/blog/${a.slug}`,
        datePublished: isoDate(a.publishedAt) || undefined,
        dateModified: isoDate(a.updatedAt) || isoDate(a.publishedAt) || undefined,
        author: { '@type': 'Organization', name: a.author || 'Eu Cardápio' },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: items.map((a, i) => ({
        '@type': 'ListItem',
        position: (n - 1) * PAGE_SIZE + i + 1,
        url: `${SITE_URL}/blog/${a.slug}`,
        name: a.title,
      })),
    },
    breadcrumbSchema(crumbs),
  ]

  const head = [
    n > 1 ? `<link rel="prev" href="${pageUrl(n - 1)}">` : '',
    n < totalPages ? `<link rel="next" href="${pageUrl(n + 1)}">` : '',
  ].join('\n')

  const pager = totalPages > 1
    ? `<nav class="pager" aria-label="Paginação">
${n > 1 ? `<a href="${pagePath(n - 1)}" rel="prev">← Mais recentes</a>` : ''}
<span>Página ${n} de ${totalPages}</span>
${n < totalPages ? `<a href="${pagePath(n + 1)}" rel="next">Mais antigos →</a>` : ''}
</nav>`
    : ''

  const body = `${breadcrumbHtml(crumbs)}
<section class="intro">
<p class="eyebrow">Blog do Eu Cardápio</p>
<h1>Dicas para restaurantes que fazem delivery</h1>
<p>${escapeHtml(DESCRIPTION)}</p>
</section>
${items.length
    ? `<div class="grid">${items.map((a) => articleCard(a, 'h2')).join('\n')}</div>`
    : '<div class="empty"><p>Nenhum artigo publicado ainda. Volte em breve.</p></div>'}
${pager}`

  return sendHtml(res, 200, page({ title, description: DESCRIPTION, canonical, schemas, head, body }), CACHE_OK)
}
