import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Terminal from './components/Terminal'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/Cursor'

function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-[#c0caf5]">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Terminal />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
