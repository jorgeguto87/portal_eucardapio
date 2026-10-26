// /sitemap.xml (rewrite em vercel.json → /api/sitemap). Substitui o antigo
// public/sitemap.xml estático: páginas fixas do portal + /blog + cada artigo.

import { SITE_URL, CACHE_OK, fetchArticles, ApiUnavailable, isoDate } from './_lib/blog.js'

// Mesmas URLs que estavam em public/sitemap.xml (sem /blog, que vem abaixo).
const STATIC_URLS = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/funcionalidades', changefreq: 'monthly', priority: '0.8' },
  { path: '/cardapio-digital', changefreq: 'monthly', priority: '0.9' },
  { path: '/pedido-whatsapp', changefreq: 'monthly', priority: '0.9' },
  { path: '/pagamento-online', changefreq: 'monthly', priority: '0.9' },
  { path: '/qr-code-mesa', changefreq: 'monthly', priority: '0.8' },
  { path: '/sistema-delivery', changefreq: 'monthly', priority: '0.9' },
  { path: '/cashback-fidelizacao', changefreq: 'monthly', priority: '0.8' },
  { path: '/precos', changefreq: 'monthly', priority: '0.9' },
  { path: '/sobre', changefreq: 'monthly', priority: '0.5' },
  { path: '/contato', changefreq: 'monthly', priority: '0.5' },
]

const xmlEscape = (s) => String(s).replace(/[<>&'"]/g, (c) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
}[c]))

function urlTag({ loc, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}${
  changefreq ? `\n    <changefreq>${changefreq}</changefreq>` : ''}${
  priority ? `\n    <priority>${priority}</priority>` : ''}
  </url>`
}

export default async function handler(req, res) {
  let articles
  try {
    articles = await fetchArticles()
  } catch (err) {
    if (!(err instanceof ApiUnavailable)) throw err
    // Melhor um erro temporário do que um sitemap sem os artigos: o Google
    // tenta de novo e mantém a versão anterior.
    console.error('[sitemap] API do SEO indisponível:', err.message)
    res.statusCode = 503
    res.setHeader('Retry-After', '120')
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    return res.end('Sitemap temporariamente indisponível.')
  }

  const lastBlog = articles
    .map((a) => isoDate(a.updatedAt) || isoDate(a.publishedAt))
    .filter(Boolean)
    .sort()
    .pop()

  const entries = [
    ...STATIC_URLS.map((u) => ({ loc: `${SITE_URL}${u.path}`, changefreq: u.changefreq, priority: u.priority })),
    { loc: `${SITE_URL}/blog`, lastmod: lastBlog, changefreq: 'weekly', priority: '0.7' },
    ...articles.map((a) => ({
      loc: `${SITE_URL}/blog/${encodeURIComponent(a.slug)}`,
      lastmod: isoDate(a.updatedAt) || isoDate(a.publishedAt),
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(urlTag).join('\n')}
</urlset>
`
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', CACHE_OK)
  res.end(xml)
}
