// /blog/rss.xml (rewrite em vercel.json → /api/rss). Feed RSS 2.0 com os 30 artigos mais recentes.

import { SITE_URL, CACHE_OK, fetchArticles, ApiUnavailable, isoDate } from './_lib/blog.js'

const xmlEscape = (s) => String(s ?? '').replace(/[<>&'"]/g, (c) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
}[c]))
const rfc822 = (v) => { const iso = isoDate(v); return iso ? new Date(iso).toUTCString() : '' }

export default async function handler(req, res) {
  let articles
  try {
    articles = await fetchArticles()
  } catch (err) {
    if (!(err instanceof ApiUnavailable)) throw err
    console.error('[rss] API do SEO indisponível:', err.message)
    res.statusCode = 503
    res.setHeader('Retry-After', '120')
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    return res.end('Feed temporariamente indisponível.')
  }
  const list = [...articles]
    .sort((a, b) => (isoDate(b.publishedAt) || '').localeCompare(isoDate(a.publishedAt) || ''))
    .slice(0, 30)
  const items = list.map((a) => {
    const link = `${SITE_URL}/blog/${encodeURIComponent(a.slug)}`
    const date = rfc822(a.publishedAt)
    return `    <item>
      <title>${xmlEscape(a.title)}</title>
      <link>${xmlEscape(link)}</link>
      <guid isPermaLink="true">${xmlEscape(link)}</guid>${date ? `\n      <pubDate>${date}</pubDate>` : ''}
      <description>${xmlEscape(a.excerpt || a.metaDescription || '')}</description>${a.focusKeyword ? `\n      <category>${xmlEscape(a.focusKeyword)}</category>` : ''}
    </item>`
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Eu Cardápio</title>
    <link>${SITE_URL}/blog</link>
    <description>Dicas práticas de gestão, cardápio digital, delivery e atendimento para restaurantes.</description>
    <language>pt-BR</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />${list[0] ? `\n    <lastBuildDate>${rfc822(list[0].updatedAt || list[0].publishedAt)}</lastBuildDate>` : ''}
${items.join('\n')}
  </channel>
</rss>
`
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  res.setHeader('Cache-Control', CACHE_OK)
  res.end(xml)
}
