// Monta uma página do portal no servidor, para gerar o HTML pronto na build
// (scripts/prerender.js). O navegador continua usando o main.jsx.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

export function render(url) {
  return renderToString(
    <HelmetProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  )
}
