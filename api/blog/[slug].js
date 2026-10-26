// /blog/:slug (rewrite em vercel.json → /api/blog/:slug). Artigo completo
// renderizado no servidor: Markdown → HTML sanitizado, metatags, JSON-LD.

import {
  SITE_URL, CACHE_OK, OG_IMAGE, SIGNUP_URL, fetchArticle, fetchArticles, ApiUnavailable, page,
  sendHtml, redirect, errorPage, parseUrl, breadcrumbSchema, breadcrumbHtml, publisher,
  articleCard, renderMarkdown, relatedArticles, isoDate, formatDate, readingTime, escapeHtml,
} from '../_lib/blog.js'

// Os slugs gerados pelo painel são sempre minúsculos, sem acento: [a-z0-9-].
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function rawSlugFrom(req, url) {
  const m = url.pathname.match(/^\/(?:api\/)?blog\/([^/]+)\/*$/)
  let s = m ? m[1] : (req.query && req.query.slug) || ''
  try { s = decodeURIComponent(s) } catch { /* mantém como veio */ }
  return { slug: String(s), trailing: /\/+$/.test(url.pathname) && !!m }
}

export default async function handler(req, res) {
  const url = parseUrl(req)
  const { slug: raw, trailing } = rawSlugFrom(req, url)
  const slug = raw.trim().toLowerCase()

  if (!VALID_SLUG.test(slug) || slug.length > 160) return errorPage(res, 404)
  // Maiúsculas ou barra final → 301 para a URL canônica (mantém a query).
  if (slug !== raw || trailing) return redirect(res, `/blog/${slug}${url.search}`)

  let article, all
  try {
    // Lista em paralelo, só para "Artigos relacionados" — se falhar, segue sem.
    const [a, list] = await Promise.all([
      fetchArticle(slug),
      fetchArticles().catch(() => []),
    ])
    article = a
    all = list
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      console.error('[blog] API do SEO indisponível:', err.message)
      return errorPage(res, 503)
    }
    throw err
  }
  if (!article) return errorPage(res, 404)

  const canonical = `${SITE_URL}/blog/${article.slug}`
  const title = article.metaTitle || `${article.title} | Eu Cardápio`
  const description = article.metaDescription || article.excerpt || ''
  const published = isoDate(article.publishedAt) || isoDate(article.createdAt)
  const modified = isoDate(article.updatedAt) || published
  const author = article.author || 'Eu Cardápio'
  const contentHtml = renderMarkdown(article.content, article.title)
  const related = relatedArticles(article, all, 3)
  const keywords = [article.focusKeyword, ...(article.secondaryKeywords || [])].filter(Boolean)

  const crumbs = [
    { name: 'Início', url: `${SITE_URL}/`, path: '/' },
    { name: 'Blog', url: `${SITE_URL}/blog`, path: '/blog' },
    { name: article.title, url: canonical, path: `/blog/${article.slug}` },
  ]

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title.slice(0, 110),
      description,
      image: [OG_IMAGE],
      datePublished: published || undefined,
      dateModified: modified || undefined,
      author: author === 'Eu Cardápio'
        ? { '@type': 'Organization', name: author, url: `${SITE_URL}/` }
        : { '@type': 'Person', name: author },
      publisher,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      url: canonical,
      inLanguage: 'pt-BR',
      keywords: keywords.length ? keywords.join(', ') : undefined,
      isPartOf: { '@type': 'Blog', '@id': `${SITE_URL}/blog#blog`, name: 'Blog do Eu Cardápio' },
    },
    breadcrumbSchema(crumbs),
  ]

  const head = [
    published ? `<meta property="article:published_time" content="${published}">` : '',
    modified ? `<meta property="article:modified_time" content="${modified}">` : '',
    `<meta property="article:author" content="${escapeHtml(author)}">`,
    `<meta name="author" content="${escapeHtml(author)}">`,
  ].filter(Boolean).join('\n')

  const body = `<article class="article">
${breadcrumbHtml(crumbs)}
${article.focusKeyword ? `<p class="eyebrow">${escapeHtml(article.focusKeyword)}</p>` : ''}
<h1>${escapeHtml(article.title)}</h1>
${article.excerpt ? `<p class="lead">${escapeHtml(article.excerpt)}</p>` : ''}
<p class="byline">Por ${escapeHtml(author)}${published ? ` · <time datetime="${published}">${formatDate(published)}</time>` : ''}${
    modified && published && modified.slice(0, 10) !== published.slice(0, 10)
      ? ` · atualizado em <time datetime="${modified}">${formatDate(modified)}</time>` : ''
  } · ${readingTime(article.content)} min de leitura</p>
<div class="prose">
${contentHtml}
</div>
<aside class="cta">
<h2>Seu cardápio digital no ar hoje</h2>
<p>Teste o Eu Cardápio por 7 dias grátis, sem cartão de crédito. Sem comissão por venda.</p>
<a class="btn" href="${SIGNUP_URL}">Começar teste grátis</a>
</aside>
<a class="back" href="/blog">← Todos os artigos</a>
</article>
${related.length ? `<section class="related" aria-labelledby="rel-t">
<h2 id="rel-t">Artigos relacionados</h2>
<div class="grid">${related.map((a) => articleCard(a, 'h3')).join('\n')}</div>
</section>` : ''}`

  return sendHtml(res, 200, page({ title, description, canonical, ogType: 'article', schemas, head, body }), CACHE_OK)
}
