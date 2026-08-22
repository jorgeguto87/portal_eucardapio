import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Pricing from './components/Pricing'
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
      <Signup />
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-paper">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/funcionalidades" element={<FuncionalidadesPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
