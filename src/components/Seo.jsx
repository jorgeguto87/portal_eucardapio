import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getSeoForPath } from '../lib/seoConfig'

// Dados estruturados (JSON-LD) — só informação real, nada inventado
// (sem avaliação falsa, sem número de cliente inventado, sem depoimento).
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Eu Cardápio',
  url: 'https://portal.eucardapio.com.br/',
  logo: 'https://portal.eucardapio.com.br/favicon.png',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Eu Cardápio',
  url: 'https://portal.eucardapio.com.br/',
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Eu Cardápio',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Cardápio digital para restaurantes, com pedido pelo WhatsApp, pagamento direto na conta do restaurante e cashback para o cliente.',
  offers: {
    '@type': 'Offer',
    price: '79.90',
    priceCurrency: 'BRL',
    priceValidUntil: '2027-12-31',
  },
}

export default function Seo() {
  const { pathname } = useLocation()
  const { title, description, canonical } = getSeoForPath(pathname)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
    </Helmet>
  )
}
