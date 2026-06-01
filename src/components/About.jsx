import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLang } from '../LanguageContext'

export default function About() {
  const { t } = useLang()
  const a = t.about
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  const details = [
    { label: a.age, value: a.ageVal },
    { label: a.location, value: a.locationVal },
    { label: a.study, value: a.studyVal },
    { label: a.interests, value: a.interestsVal },
  ]

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-section">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-sm font-medium text-accent-light mb-2 tracking-wider uppercase">
            {a.section}
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12">
            {a.heading}{' '}
            <span className="gradient-text">{a.headingAccent}</span>
          </h2>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3 space-y-5 text-gray-400 leading-relaxed">
              <p className="text-lg text-gray-300">{a.p1}</p>
              <p>{a.p2}</p>
              <p>{a.p3}</p>

              <div className="grid grid-cols-2 gap-3 pt-4">
                {details.map((d) => (
                  <div key={d.label} className="glass rounded-lg p-3">
                    <span className="text-[11px] uppercase tracking-wider text-gray-500">
                      {d.label}
                    </span>
                    <p className="text-sm text-gray-200 mt-0.5">{d.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {a.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 md:sticky md:top-24">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-teal-500 rounded-2xl blur-lg opacity-50" />
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-light flex items-center justify-center">
                  <img
                    src="https://avatars.githubusercontent.com/u/186924843?v=4"
                    alt="Stephan"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-4 text-sm text-gray-400">
                <a
                  href="mailto:stepanvoytov@yandex.ru"
                  className="flex items-center gap-1.5 hover:text-accent-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
                <a
                  href="https://github.com/stephanvoytov"
                  className="flex items-center gap-1.5 hover:text-accent-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
