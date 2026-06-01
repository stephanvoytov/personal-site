import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'

export default function Footer() {
  const { t } = useLang()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="container-section flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Stephan. {t.footer}
        </p>

        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="glass w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-accent/30 transition-all duration-300"
          aria-label={t.scrollToTop}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </footer>
  )
}
