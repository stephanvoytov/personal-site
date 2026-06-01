import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LanguageContext'

function Clock() {
  const { lang } = useLang()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const locale = lang === 'ru' ? 'ru-RU' : 'en-US'

  return (
    <span className="text-xs font-mono text-gray-500 hidden lg:block">
      {time.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}{' '}
      {time.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#hero', label: t.nav[0] },
    { href: '#about', label: t.nav[1] },
    { href: '#skills', label: t.nav[2] },
    { href: '#projects', label: t.nav[3] },
    { href: '#contact', label: t.nav[4] },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = links.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [t.nav])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-section flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            className="text-xl font-display font-bold gradient-text"
          >
            Stephan
          </a>
          <Clock />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active === link.href.slice(1)
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-0.5 glass rounded-lg p-0.5" role="radiogroup" aria-label="Language">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                lang === 'en' ? 'bg-accent text-white' : 'text-gray-400 hover:text-white'
              }`}
              aria-label="Switch to English"
              role="radio"
              aria-checked={lang === 'en'}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ru')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                lang === 'ru' ? 'bg-accent text-white' : 'text-gray-400 hover:text-white'
              }`}
              aria-label="Switch to Russian"
              role="radio"
              aria-checked={lang === 'ru'}
            >
              RU
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            aria-label={t.nav[0]}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white rounded"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-white rounded"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white rounded"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="container-section py-4 flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active === link.href.slice(1)
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
