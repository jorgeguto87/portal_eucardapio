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
import FuncionalidadesPage from './pages/FuncionalidadesPage'

function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Faq />
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
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
