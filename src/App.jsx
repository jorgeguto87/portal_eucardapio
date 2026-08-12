import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Signup from './components/Signup'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <Signup />
      </main>
      <Footer />
    </div>
  )
}
