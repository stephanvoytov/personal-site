import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'

export default function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Section label */}
          <p className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">
            {a.section}
          </p>

          {/* Bio */}
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
            {a.heading}{' '}
            <span className="gradient-text">{a.headingAccent}</span>
          </h2>

          <div className="space-y-4 text-sm md:text-base text-[#6b7280] leading-relaxed">
            <p>{a.p1}</p>
            <p>{a.p2}</p>
            <p>{a.p3}</p>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: a.age, value: a.ageVal },
              { label: a.location, value: a.locationVal },
              { label: a.study, value: a.studyVal },
              { label: a.interests, value: a.interestsVal },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass rounded-xl p-4 text-center"
              >
                <p className="text-xs text-[#565f89] mb-1">{item.label}</p>
                <p className="text-sm font-medium text-[#c0caf5]">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-2 mt-6 justify-center"
          >
            {a.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono rounded-full border border-[#1e2030] text-[#565f89]"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-8 border-t border-[#1e2030]"
          >
            <a
              href="mailto:stepanvoytov@yandex.ru"
              className="flex items-center gap-2 text-sm text-[#565f89] hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              stepanvoytov@yandex.ru
            </a>
            <span className="hidden sm:block text-[#1e2030]">·</span>
            <a
              href="https://t.me/ngriia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#565f89] hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              @ngriia
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
