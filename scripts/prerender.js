// Gera o HTML pronto das páginas do portal depois do `vite build`.
//
// Sem isto, toda página entregava o mesmo index.html vazio e o conteúdo só
// aparecia depois que o JavaScript rodava. Agora cada rota sai com o próprio
// título, descrição, canonical e o texto da página já no HTML — o que o Google
// lê de primeira. No navegador o React assume esse HTML (main.jsx) e tudo
// continua funcionando igual: animações, menu, cadastro.
//
// Saída: dist/index.html (início) e dist/<rota>.html, servidas nos endereços
// sem .html pelos rewrites do vercel.json. O index.html original (vazio) fica
// como dist/spa.html, para qualquer outro endereço continuar como antes.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { seoConfig } from '../src/lib/seoConfig.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

// As rotas do portal (as mesmas do App.jsx). /blog é página do servidor (api/blog).
const ROUTES = Object.keys(seoConfig).filter((r) => r !== '/blog')

// Metatags do index.html que mudam por página — saem do modelo e entram as da página.
const PER_PAGE = [
  /\s*<title>[\s\S]*?<\/title>/,
  /\s*<meta name="description"[^>]*>/,
  /\s*<meta property="og:title"[^>]*>/,
  /\s*<meta property="og:description"[^>]*>/,
  /\s*<meta property="og:url"[^>]*>/,
  /\s*<meta name="twitter:title"[^>]*>/,
  /\s*<meta name="twitter:description"[^>]*>/,
]

// O React 19 coloca no começo do HTML as tags que vão para o <head>
// (title, meta, link). Separa essas do conteúdo da página.
const HEAD_TAG = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/

function splitHead(html) {
  let head = ''
  let rest = html
  for (let m = rest.match(HEAD_TAG); m; m = rest.match(HEAD_TAG)) {
    head += m[0]
    rest = rest.slice(m[0].length)
  }
  return { head, body: rest }
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
fs.writeFileSync(path.join(dist, 'spa.html'), template)
let base = template
for (const re of PER_PAGE) {
  if (!re.test(base)) throw new Error(`index.html sem a metatag esperada: ${re}`)
  base = base.replace(re, '')
}
if (!base.includes('<div id="root"></div>')) throw new Error('index.html sem <div id="root"></div>')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

for (const route of ROUTES) {
  const { head, body } = splitHead(render(route))
  if (!head.includes('<title>')) throw new Error(`${route}: a página não gerou <title>`)
  const html = base
    .replace('</head>', `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  fs.writeFileSync(path.join(dist, file), html)
  console.log(`prerender: ${route} → dist/${file}`)
}

fs.rmSync(ssrDir, { recursive: true, force: true })
