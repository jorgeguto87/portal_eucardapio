import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

// Páginas geradas na build (scripts/prerender.js) já chegam com o conteúdo:
// o React assume esse HTML. Sem conteúdo, monta do zero.
const container = document.getElementById('root')
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
