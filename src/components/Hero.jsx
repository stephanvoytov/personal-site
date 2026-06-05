import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="absolute top-[-15%] left-[-5%] w-[50%] h-[50%] rounded-full bg-emerald-600/15 blur-[120px]" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] rounded-full bg-teal-600/15 blur-[120px]" />

      <div className="relative z-10 container-section text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Terminal-style label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-[#1e2030] bg-[#0a0a0f]/50"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-[#565f89]">
              {h.available}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-tight mb-4 tracking-tight"
          >
            Stepan{' '}
            <span className="gradient-text">Voytov</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-[#565f89] mb-8"
          >
            {h.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm md:text-base text-[#6b7280] max-w-lg mx-auto mb-10 leading-relaxed"
          >
            {h.desc}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-dark text-[#0a0a0f] font-semibold rounded-xl transition-all duration-300"
            >
              {h.btnProjects}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-[#1e2030] hover:border-[#2f3346] text-[#c0caf5] font-medium rounded-xl transition-all duration-300 hover:bg-[#1e2030]/30"
            >
              {h.btnContact}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
