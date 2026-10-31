// Código compartilhado das páginas do blog renderizadas no servidor (Vercel
// Serverless Functions). Arquivos dentro de api/_lib NÃO viram rotas na
// Vercel (o prefixo "_" exclui), então aqui fica só a lógica reaproveitada.
//
// Fonte dos artigos: API pública do painel de SEO
//   GET {SEO_API_URL}/public/articles        → { articles: [...] }
//   GET {SEO_API_URL}/public/articles/:slug  → { article: {...} } ou 404

import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

export const SITE_URL = 'https://portal.eucardapio.com.br'
export const SITE_HOST = 'portal.eucardapio.com.br'
export const PAINEL_URL = 'https://painel.eucardapio.com.br'
// Mesmo destino do botão "Eu quero" do portal: seção de cadastro da home.
export const SIGNUP_URL = '/#comecar'
export const OG_IMAGE = `${SITE_URL}/og-image.png`
export const LOGO_URL = `${SITE_URL}/favicon.png`
export const PAGE_SIZE = 12
export const CACHE_OK = 'public, s-maxage=300, stale-while-revalidate=600'
const API_TIMEOUT_MS = 6000

export const apiBase = () =>
  (process.env.SEO_API_URL || 'https://seo.eucardapio.com.br/api').replace(/\/+$/, '')

// ---------------------------------------------------------------------------
// Acesso à API
// ---------------------------------------------------------------------------

export class ApiUnavailable extends Error {}

async function getJson(path) {
  let res
  try {
    res = await fetch(`${apiBase()}${path}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    })
  } catch (err) {
    throw new ApiUnavailable(`falha de conexão: ${err.name === 'TimeoutError' ? 'timeout' : err.message}`)
  }
  if (res.status === 404) return null
  if (!res.ok) throw new ApiUnavailable(`HTTP ${res.status}`)
  try {
    return await res.json()
  } catch {
    throw new ApiUnavailable('resposta não é JSON')
  }
}

export async function fetchArticles() {
  const data = await getJson('/public/articles')
  if (!data || !Array.isArray(data.articles)) throw new ApiUnavailable('lista inválida')
  return data.articles.filter((a) => a && a.slug && a.title)
}

export async function fetchArticle(slug) {
  const data = await getJson(`/public/articles/${encodeURIComponent(slug)}`)
  if (!data) return null
  if (!data.article || !data.article.slug) throw new ApiUnavailable('artigo inválido')
  return data.article
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

export function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]))
}

// JSON dentro de <script>: impede que "</script>" no texto feche a tag.
export function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')}</script>`
}

export function isoDate(value) {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d.toISOString()
}

export function formatDate(value) {
  const iso = isoDate(value)
  if (!iso) return ''
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' }).format(new Date(iso))
}

export function readingTime(markdown) {
  const words = String(markdown || '').replace(/[#>*_`|\-[\]()!]/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// Caminho e query da URL ORIGINAL. Na Vercel, numa rewrite para função,
// req.url mantém o caminho que o visitante pediu (ex.: /blog/meu-artigo).
export function parseUrl(req) {
  return new URL(req.url || '/', 'http://localhost')
}

export function sendHtml(res, status, html, cacheControl = CACHE_OK) {
  res.statusCode = status
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', cacheControl)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(html)
}

export function redirect(res, location) {
  res.statusCode = 301
  res.setHeader('Location', location)
  res.setHeader('Cache-Control', 'public, s-maxage=3600')
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end(`Redirecionando para ${location}`)
}

// ---------------------------------------------------------------------------
// Markdown → HTML seguro
// ---------------------------------------------------------------------------

const SANITIZE_OPTIONS = {
  allowedTags: [
    'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
    'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'del', 's',
    'blockquote', 'a', 'code', 'pre',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
    th: ['align'],
    td: ['align'],
    ol: ['start'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  allowProtocolRelative: false,
  disallowedTagsMode: 'discard',
  transformTags: {
    // O <h1> da página é o título do artigo; títulos do corpo começam no h2.
    h1: 'h2',
    a: (tagName, attribs) => {
      const href = String(attribs.href || '').trim()
      const out = { ...attribs }
      delete out.rel
      if (/^https?:\/\//i.test(href)) {
        try {
          const u = new URL(href)
          if (u.hostname === SITE_HOST || u.hostname === `www.${SITE_HOST}`) {
            // Link interno: vira relativo.
            out.href = `${u.pathname}${u.search}${u.hash}` || '/'
          } else {
            out.rel = 'noopener'
          }
        } catch {
          delete out.href
        }
      }
      return { tagName, attribs: out }
    },
    img: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, loading: 'lazy', decoding: 'async' },
    }),
  },
  // Imagens só com endereço absoluto http(s); o resto é descartado.
  exclusiveFilter: (frame) => frame.tag === 'img' && !/^https?:\/\//i.test(frame.attribs.src || ''),
}

export function renderMarkdown(markdown, title) {
  let md = String(markdown || '').replace(/\r\n/g, '\n')
  // Se o texto começa repetindo o título como "# Título", remove (já é o h1).
  const first = md.trimStart().match(/^#\s+(.+)\n?/)
  if (first && normalize(first[1]) === normalize(title)) md = md.trimStart().slice(first[0].length)
  const raw = marked.parse(md, { gfm: true, breaks: false, async: false })
  // Tabela larga rola dentro do próprio bloco, sem alargar a página no celular.
  return sanitizeHtml(raw, SANITIZE_OPTIONS)
    .replace(/<table>/g, '<div class="tbl"><table>')
    .replace(/<\/table>/g, '</table></div>')
}

// ---------------------------------------------------------------------------
// Artigos relacionados
// ---------------------------------------------------------------------------

const STOPWORDS = new Set(('a o e de da do das dos em no na nos nas um uma uns umas para pra por com sem que como mais seu sua seus suas ' +
  'ao aos as os ou se ser sao sobre entre ate voce voces qual quais quando onde porque nao sim muito pouco este esta isso ' +
  'guia dicas passo melhor melhores').split(' '))

export function normalize(s) {
  return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

function words(s) {
  return new Set(normalize(s).split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !STOPWORDS.has(w)))
}

export function relatedArticles(current, all, max = 3) {
  const kw = normalize(current.focusKeyword)
  const titleWords = words(`${current.title} ${current.focusKeyword || ''}`)
  return all
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      let score = 0
      if (kw && normalize(a.focusKeyword) === kw) score += 10
      for (const w of words(`${a.title} ${a.focusKeyword || ''}`)) if (titleWords.has(w)) score += 1
      return { a, score, t: new Date(a.publishedAt || 0).getTime() || 0 }
    })
    .sort((x, y) => y.score - x.score || y.t - x.t)
    .slice(0, max)
    .map((x) => x.a)
}

// ---------------------------------------------------------------------------
// Layout (mesma identidade visual do portal: src/index.css + Nav/Footer)
// ---------------------------------------------------------------------------

const CSS = `
:root{--paper:#FFF8F0;--paper-dim:#F5EDE0;--ink:#1A1A2E;--ink-soft:#2D2D4E;--ember:#FF6B2C;--ember-dark:#E05520;
--display:'Fraunces',Georgia,'Times New Roman',serif;--sans:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace}
*{box-sizing:border-box}
html{overflow-x:hidden;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.6}
a{color:inherit}
img{max-width:100%;height:auto}
:focus-visible{outline:2px solid var(--ember);outline-offset:3px}
.wrap{max-width:72rem;margin:0 auto;padding:0 16px}
@media(min-width:640px){.wrap{padding:0 24px}}
@media(min-width:768px){.wrap{padding:0 40px}}
/* Header */
.hd{position:sticky;top:0;z-index:50;background:rgba(255,248,240,.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 1px 0 rgba(26,26,46,.08)}
.hd .wrap{height:64px;display:flex;align-items:center;justify-content:space-between;gap:8px}
@media(min-width:768px){.hd .wrap{height:80px}}
.brand{display:flex;align-items:center;gap:8px;text-decoration:none;min-width:0}
.brand img{width:32px;height:32px;border-radius:8px;flex-shrink:0}
@media(min-width:640px){.brand img{width:36px;height:36px}}
.brand span{font-family:var(--display);font-weight:600;font-size:clamp(1.05rem,4vw,1.5rem);letter-spacing:-.01em;white-space:nowrap}
.nav{display:none;align-items:center;gap:4px}
@media(min-width:768px){.nav{display:flex}}
.nav a{font-size:.875rem;font-weight:500;color:var(--ink-soft);text-decoration:none;padding:8px 10px;white-space:nowrap;border-radius:6px}
.nav a:hover,.nav a[aria-current]{color:var(--ink)}
.nav a[aria-current]{text-decoration:underline;text-decoration-color:var(--ember);text-decoration-thickness:2px;text-underline-offset:6px}
.btn{display:inline-block;font-weight:600;color:var(--paper)!important;background:var(--ink);border-radius:999px;text-decoration:none!important;white-space:nowrap;transition:background .2s}
.btn:hover{background:var(--ink-soft)}
.nav .btn{padding:10px 20px;margin-left:6px}
.mob{display:flex;align-items:center;gap:8px}
@media(min-width:768px){.mob{display:none}}
.mob .btn{font-size:.75rem;padding:8px 12px}
.mob details{position:static}
.mob summary{list-style:none;cursor:pointer;padding:8px;display:flex}
.mob summary::-webkit-details-marker{display:none}
.mob .panel{position:absolute;left:0;right:0;top:64px;background:var(--paper);border-top:1px solid rgba(26,26,46,.1);padding:16px 24px 24px;box-shadow:0 12px 24px -12px rgba(26,26,46,.2)}
.mob .panel a{display:block;padding:9px 0;font-size:.95rem;color:var(--ink-soft);text-decoration:none}
/* Conteúdo */
main{padding:40px 0 72px}
@media(min-width:768px){main{padding:64px 0 96px}}
.eyebrow{font-family:var(--mono);font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--ember-dark);margin:0 0 12px}
h1,h2,h3,h4{font-family:var(--display);font-weight:600;letter-spacing:-.015em;line-height:1.15;color:var(--ink)}
.crumbs{font-size:.8rem;color:rgba(45,45,78,.7);margin:0 0 20px}
.crumbs ol{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:6px}
.crumbs li+li::before{content:"/";margin-right:6px;opacity:.5}
.crumbs a{text-decoration:none}.crumbs a:hover{text-decoration:underline}
/* Lista */
.intro h1{font-size:clamp(2rem,7vw,3.25rem);margin:0 0 16px}
.intro p{font-size:1.05rem;color:var(--ink-soft);max-width:40rem;margin:0}
.intro p.eyebrow{font-size:.72rem;color:var(--ember-dark);margin:0 0 12px}
.grid{display:grid;grid-template-columns:1fr;gap:20px;margin-top:40px}
@media(min-width:640px){.grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.grid{grid-template-columns:repeat(3,1fr)}}
.card{display:flex;flex-direction:column;background:#fff;border:1px solid rgba(26,26,46,.08);border-radius:16px;padding:24px;text-decoration:none;transition:box-shadow .2s,transform .2s}
.card:hover{box-shadow:0 20px 50px -24px rgba(26,26,46,.25);transform:translateY(-2px)}
.card .tag{font-family:var(--mono);font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ember-dark);margin:0 0 10px}
.card h2,.card h3{font-size:1.25rem;margin:0 0 10px}
.card p{font-size:.92rem;color:var(--ink-soft);margin:0 0 18px;flex:1}
.card p.tag{flex:none;font-size:.68rem;color:var(--ember-dark);margin:0 0 10px}
.card .meta{font-size:.8rem;color:rgba(45,45,78,.65)}
.card .more{color:var(--ember-dark);font-weight:600;font-size:.9rem;margin-top:8px}
.empty{background:#fff;border-radius:16px;padding:40px 24px;text-align:center;margin-top:40px;border:1px dashed rgba(26,26,46,.2)}
.pager{display:flex;justify-content:center;align-items:center;gap:16px;margin-top:48px;font-size:.92rem}
.pager a{padding:10px 18px;border:1px solid rgba(26,26,46,.18);border-radius:999px;text-decoration:none;font-weight:500}
.pager a:hover{border-color:var(--ink)}
/* Artigo */
.article{max-width:68ch;margin:0 auto}
.article h1{font-size:clamp(1.9rem,6.5vw,3rem);margin:0 0 16px}
.lead{font-size:1.15rem;color:var(--ink-soft);margin:0 0 20px}
.byline{font-size:.85rem;color:rgba(45,45,78,.75);padding-bottom:24px;border-bottom:1px dashed rgba(26,26,46,.18);margin-bottom:32px}
.prose{font-size:1.075rem;line-height:1.75;overflow-wrap:break-word}
.prose h2{font-size:clamp(1.45rem,4.5vw,1.85rem);margin:2.2em 0 .6em}
.prose h3{font-size:clamp(1.2rem,3.8vw,1.4rem);margin:1.8em 0 .5em}
.prose h4,.prose h5,.prose h6{font-size:1.1rem;margin:1.5em 0 .4em}
.prose p,.prose ul,.prose ol,.prose blockquote,.prose table,.prose pre{margin:0 0 1.25em}
.prose ul,.prose ol{padding-left:1.4em}
.prose li{margin:.35em 0}
.prose li::marker{color:var(--ember)}
.prose a{color:var(--ember-dark);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
.prose a:hover{color:var(--ink)}
.prose a:not([href]){color:inherit;text-decoration:none}
.prose strong{font-weight:700}
.prose blockquote{border-left:3px solid var(--ember);background:var(--paper-dim);padding:14px 20px;border-radius:0 12px 12px 0;color:var(--ink-soft)}
.prose blockquote p:last-child{margin-bottom:0}
.prose hr{border:0;border-top:1px dashed rgba(26,26,46,.25);margin:2.5em 0}
.prose img{border-radius:12px;display:block;margin:1.5em auto}
.prose code{font-family:var(--mono);font-size:.88em;background:var(--paper-dim);padding:.12em .4em;border-radius:5px}
.prose pre{background:var(--ink);color:var(--paper);padding:16px;border-radius:12px;overflow-x:auto}
.prose pre code{background:none;padding:0}
.tbl{overflow-x:auto;margin:0 0 1.25em;-webkit-overflow-scrolling:touch}
.prose table{border-collapse:collapse;width:100%;font-size:.95rem;background:#fff;border-radius:12px;overflow:hidden;margin:0}
.prose th,.prose td{padding:10px 14px;border-bottom:1px solid rgba(26,26,46,.08);text-align:left;vertical-align:top}
.prose th{background:var(--paper-dim);font-weight:600}
.cta{margin:56px 0 0;background:var(--ink);color:var(--paper);border-radius:20px;padding:32px 24px;text-align:center}
@media(min-width:640px){.cta{padding:40px}}
.cta h2{color:var(--paper);font-size:clamp(1.5rem,5vw,2rem);margin:0 0 10px}
.cta p{color:rgba(255,248,240,.78);margin:0 0 22px}
.cta .btn{background:var(--ember);padding:14px 28px;font-size:1rem}
.cta .btn:hover{background:var(--ember-dark)}
.related{max-width:72rem;margin:72px auto 0}
.related>h2{font-size:clamp(1.4rem,4.5vw,1.8rem);margin:0 0 4px}
.related .grid{margin-top:20px}
.back{display:inline-block;margin-top:32px;font-weight:600;color:var(--ember-dark);text-decoration:none}
.status{max-width:36rem;margin:0 auto;text-align:center;padding:40px 0}
.status h1{font-size:clamp(1.8rem,6vw,2.6rem);margin:0 0 14px}
.status p{color:var(--ink-soft)}
.status p.eyebrow{color:var(--ember-dark)}
.status .btn{padding:12px 24px;margin-top:12px}
/* Rodapé */
.ft{background:var(--ink);color:rgba(255,248,240,.7);padding:48px 0 32px;font-size:.9rem}
.ft .top{display:flex;flex-direction:column;gap:32px;padding-bottom:32px;border-bottom:1px dashed rgba(255,248,240,.15)}
@media(min-width:768px){.ft .top{flex-direction:row;justify-content:space-between}}
.ft .logo{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.ft .logo img{width:32px;height:32px;border-radius:8px}
.ft .logo span{font-family:var(--display);font-size:1.5rem;font-weight:600;color:var(--paper)}
.ft p{max-width:20rem;margin:0;line-height:1.6}
.ft ul{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:10px 24px;max-width:28rem}
.ft a{text-decoration:none}.ft a:hover{color:var(--paper)}
.ft .bottom{padding-top:20px;font-family:var(--mono);font-size:.75rem;color:rgba(255,248,240,.4)}
`

function header(active) {
  const cur = (k) => (active === k ? ' aria-current="page"' : '')
  return `<header class="hd"><div class="wrap">
<a class="brand" href="/"><img src="/favicon.png" alt="" width="36" height="36"><span>Eu Cardápio</span></a>
<nav class="nav" aria-label="Principal">
<a href="/funcionalidades">Funcionalidades</a>
<a href="/precos">Preços</a>
<a href="/sobre">Sobre</a>
<a href="/blog"${cur('blog')}>Blog</a>
<a href="/contato">Contato</a>
<a href="${PAINEL_URL}">Entrar</a>
<a class="btn" href="${SIGNUP_URL}">Eu quero</a>
</nav>
<div class="mob">
<a class="btn" href="${SIGNUP_URL}">Eu quero</a>
<details><summary aria-label="Menu"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14"/></svg></summary>
<div class="panel">
<a href="/funcionalidades">Funcionalidades</a>
<a href="/precos">Preços</a>
<a href="/sobre">Sobre</a>
<a href="/blog"${cur('blog')}>Blog</a>
<a href="/contato">Contato</a>
<a href="${PAINEL_URL}">Entrar no painel</a>
</div></details>
</div>
</div></header>`
}

function footer() {
  const year = new Date().getFullYear()
  return `<footer class="ft"><div class="wrap">
<div class="top">
<div><div class="logo"><img src="/favicon.png" alt="" width="32" height="32"><span>Eu Cardápio</span></div>
<p>Cardápio digital, WhatsApp automático e pagamento direto na conta — tudo num painel só, sem depender de terceiro.</p></div>
<ul>
<li><a href="/funcionalidades">Funcionalidades</a></li>
<li><a href="/precos">Preços</a></li>
<li><a href="/sobre">Sobre</a></li>
<li><a href="/blog">Blog</a></li>
<li><a href="/contato">Contato</a></li>
<li><a href="${SIGNUP_URL}">Comece grátis</a></li>
<li><a href="${PAINEL_URL}">Entrar no painel</a></li>
</ul>
</div>
<div class="bottom">© ${year} Eu Cardápio — todos os direitos reservados</div>
</div></footer>`
}

/**
 * Documento HTML completo.
 * opts: { title, description, canonical, robots, ogType, schemas[], head, body, active }
 */
export function page(opts) {
  const {
    title, description = '', canonical, robots = 'index,follow', ogType = 'website',
    schemas = [], head = '', body, active = 'blog',
  } = opts
  const t = escapeHtml(title)
  const d = escapeHtml(description)
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t}</title>
<meta name="description" content="${d}">
<meta name="robots" content="${robots}">
${canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}">` : ''}
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="alternate" type="application/rss+xml" title="Blog Eu Cardápio" href="${SITE_URL}/blog/rss.xml">
<meta property="og:site_name" content="Eu Cardápio">
<meta property="og:locale" content="pt_BR">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
${canonical ? `<meta property="og:url" content="${escapeHtml(canonical)}">` : ''}
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${OG_IMAGE}">
${head}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap">
<style>${CSS.replace(/\n/g, '')}</style>
${schemas.map(jsonLd).join('\n')}
</head>
<body>
${header(active)}
<main><div class="wrap">
${body}
</div></main>
${footer()}
</body>
</html>`
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  }
}

export function breadcrumbHtml(items) {
  return `<nav class="crumbs" aria-label="Você está em"><ol>${items
    .map((it, i) => (i === items.length - 1
      ? `<li aria-current="page">${escapeHtml(it.name)}</li>`
      : `<li><a href="${escapeHtml(it.path)}">${escapeHtml(it.name)}</a></li>`))
    .join('')}</ol></nav>`
}

export const publisher = {
  '@type': 'Organization',
  name: 'Eu Cardápio',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: LOGO_URL, width: 500, height: 500 },
}

export function articleCard(a, headingTag = 'h2') {
  const date = formatDate(a.publishedAt)
  return `<a class="card" href="/blog/${escapeHtml(a.slug)}">
${a.focusKeyword ? `<p class="tag">${escapeHtml(a.focusKeyword)}</p>` : ''}
<${headingTag}>${escapeHtml(a.title)}</${headingTag}>
<p>${escapeHtml(a.excerpt || a.metaDescription || '')}</p>
${date ? `<span class="meta"><time datetime="${isoDate(a.publishedAt)}">${date}</time></span>` : ''}
<span class="more">Ler artigo →</span>
</a>`
}

// Página de erro: 404 (não existe) ou 503 (API fora). Sempre noindex.
export function errorPage(res, status) {
  const is404 = status === 404
  const title = is404 ? 'Página não encontrada | Eu Cardápio' : 'Blog temporariamente indisponível | Eu Cardápio'
  const body = `<div class="status">
<p class="eyebrow">${is404 ? 'Erro 404' : 'Volte em instantes'}</p>
<h1>${is404 ? 'Esse artigo não está aqui' : 'O blog está fora do ar por um momento'}</h1>
<p>${is404
    ? 'O endereço pode ter mudado ou o artigo foi retirado. Veja os artigos publicados no blog.'
    : 'Não conseguimos carregar os artigos agora. Tente de novo em alguns minutos.'}</p>
<a class="btn" href="/blog">${is404 ? 'Ver todos os artigos' : 'Tentar de novo'}</a>
<p style="margin-top:24px"><a href="/">Ir para a página inicial</a></p>
</div>`
  if (!is404) res.setHeader('Retry-After', '120')
  return sendHtml(res, status, page({ title, description: '', canonical: null, robots: 'noindex,follow', body }),
    is404 ? 'public, s-maxage=60, stale-while-revalidate=120' : 'no-store')
}
