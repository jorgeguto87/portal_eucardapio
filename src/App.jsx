import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Nav from './components/Nav'
import ScrollToTop from './components/ScrollToTop'
import Seo from './components/Seo'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import Signup from './components/Signup'
import Footer from './components/Footer'
import ArticleStrip from './components/ArticleStrip'
import FuncionalidadesPage from './pages/FuncionalidadesPage'
import CardapioDigitalPage from './pages/CardapioDigitalPage'
import PedidoWhatsAppPage from './pages/PedidoWhatsAppPage'
import PagamentoOnlinePage from './pages/PagamentoOnlinePage'
import QrCodeMesaPage from './pages/QrCodeMesaPage'
import SistemaDeliveryPage from './pages/SistemaDeliveryPage'
import CashbackFidelizacaoPage from './pages/CashbackFidelizacaoPage'
import PedidosBalcaoPage from './pages/PedidosBalcaoPage'
import MultiplasImpressorasPage from './pages/MultiplasImpressorasPage'
import PrecosPage from './pages/PrecosPage'
import SobrePage from './pages/SobrePage'
import ContatoPage from './pages/ContatoPage'

function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Faq />
      <ArticleStrip eyebrow="Blog Eu Cardápio" className="py-20" />
      <Signup />
    </main>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Seo />
        <div className="min-h-screen bg-paper">
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/funcionalidades" element={<FuncionalidadesPage />} />
            <Route path="/cardapio-digital" element={<CardapioDigitalPage />} />
            <Route path="/pedido-whatsapp" element={<PedidoWhatsAppPage />} />
            <Route path="/pagamento-online" element={<PagamentoOnlinePage />} />
            <Route path="/qr-code-mesa" element={<QrCodeMesaPage />} />
            <Route path="/sistema-delivery" element={<SistemaDeliveryPage />} />
            <Route path="/cashback-fidelizacao" element={<CashbackFidelizacaoPage />} />
            <Route path="/pedidos-balcao" element={<PedidosBalcaoPage />} />
            <Route path="/multiplas-impressoras" element={<MultiplasImpressorasPage />} />
            <Route path="/precos" element={<PrecosPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/contato" element={<ContatoPage />} />
            {/* /blog e /blog/:slug são páginas do servidor (api/blog, ver vercel.json). */}
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
