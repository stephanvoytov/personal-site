import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LanguageContext'

const NAV_ITEMS = ['home', 'about', 'skills', 'projects', 'contact']

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#1e2030]'
          : 'bg-[#0a0a0f]/60 border-b border-transparent'
      }`}
    >
      <div className="container-section flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#home"
          className="font-mono text-sm text-[#565f89] hover:text-accent transition-colors"
        >
          <span className="text-accent">~</span>/stephan
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="px-3 py-2 text-sm text-[#565f89] hover:text-[#c0caf5] transition-colors rounded-lg hover:bg-[#1e2030]/50"
            >
              {t.nav[NAV_ITEMS.indexOf(item)]}
            </a>
          ))}
          <span className="w-px h-5 bg-[#1e2030] mx-2" />
          <div className="flex items-center gap-1 bg-[#1a1a2e] rounded-lg p-0.5">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 text-xs rounded-md transition-all ${
                lang === 'en'
                  ? 'bg-accent text-[#0a0a0f] font-medium'
                  : 'text-[#565f89] hover:text-[#c0caf5]'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLang('ru')}
              className={`px-2 py-1 text-xs rounded-md transition-all ${
                lang === 'ru'
                  ? 'bg-accent text-[#0a0a0f] font-medium'
                  : 'text-[#565f89] hover:text-[#c0caf5]'
              }`}
              aria-label="Switch to Russian"
            >
              RU
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#565f89] hover:text-[#c0caf5]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-[#1e2030] bg-[#0a0a0f]/95 backdrop-blur-xl"
          >
            <div className="container-section py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-sm text-[#565f89] hover:text-[#c0caf5] transition-colors rounded-lg hover:bg-[#1e2030]/50"
                >
                  {t.nav[NAV_ITEMS.indexOf(item)]}
                </a>
              ))}
              <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[#1e2030]">
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                    lang === 'en'
                      ? 'bg-accent text-[#0a0a0f] font-medium'
                      : 'text-[#565f89] hover:text-[#c0caf5]'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('ru')}
                  className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                    lang === 'ru'
                      ? 'bg-accent text-[#0a0a0f] font-medium'
                      : 'text-[#565f89] hover:text-[#c0caf5]'
                  }`}
                >
                  RU
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
