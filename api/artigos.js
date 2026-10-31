// /api/artigos: lista curta (JSON) dos artigos publicados, usada pelas páginas do portal
// ("Últimos artigos" na home e "Artigos relacionados" nas funcionalidades).

import { CACHE_OK, fetchArticles, ApiUnavailable, isoDate } from './_lib/blog.js'

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('X-Robots-Tag', 'noindex')
  try {
    const articles = (await fetchArticles())
      .sort((a, b) => (isoDate(b.publishedAt) || '').localeCompare(isoDate(a.publishedAt) || ''))
      .slice(0, 60)
      .map((a) => ({ slug: a.slug, title: a.title, excerpt: a.excerpt || a.metaDescription || '', focusKeyword: a.focusKeyword || '', publishedAt: isoDate(a.publishedAt) }))
    res.statusCode = 200
    res.setHeader('Cache-Control', CACHE_OK)
    res.end(JSON.stringify({ articles }))
  } catch (err) {
    if (!(err instanceof ApiUnavailable)) throw err
    console.error('[artigos] API do SEO indisponível:', err.message)
    res.statusCode = 503
    res.setHeader('Cache-Control', 'no-store')
    res.end(JSON.stringify({ articles: [] }))
  }
}
