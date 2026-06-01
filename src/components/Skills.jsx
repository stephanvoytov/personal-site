import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLang } from '../LanguageContext'
import { skillCategories } from '../data/projects'

const brandIcons = {
  TypeScript: 'TS',
  React: 'R',
  JavaScript: 'JS',
  'HTML / CSS': 'H',
  Tailwind: 'TW',
  Python: 'Py',
  Django: 'Dj',
  FastAPI: 'FA',
  Flask: 'Fl',
  Docker: 'D',
  PostgreSQL: 'PG',
  SQLite: 'SQ',
  Git: 'Git',
}

const catOrder = ['Frontend', 'Backend', 'DevOps & Tools']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const catVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Skills() {
  const { t } = useLang()
  const s = t.skills
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const catLabels = {
    Frontend: s.catFrontend,
    Backend: s.catBackend,
    'DevOps & Tools': s.catDevOps,
  }

  const sorted = [...skillCategories].sort(
    (a, b) => catOrder.indexOf(a.name) - catOrder.indexOf(b.name)
  )

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />

      <div className="container-section relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-sm font-medium text-accent-light mb-2 tracking-wider uppercase">
            {s.section}
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            {s.heading}
          </h2>
          <p className="text-gray-400 max-w-xl mb-12">
            {s.desc}
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sorted.map((cat) => (
              <motion.div
                key={cat.name}
                variants={catVariants}
                className="glass rounded-xl p-6 hover:border-accent/20 transition-all duration-300"
              >
                <h3 className="text-base font-display font-semibold text-white mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-accent to-teal-500 inline-block" />
                  {catLabels[cat.name] || cat.name}
                </h3>

                <div className="space-y-4">
                  {cat.skills.map((skill) => {
                    const label = brandIcons[skill.name] || skill.name.slice(0, 2)
                    return (
                      <div key={skill.name} className="flex items-center gap-3 group">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `${skill.color}22`, color: skill.color }}
                        >
                          {label}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-[11px] text-gray-500">{skill.level}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${skill.level}%` } : {}}
                              transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                              className="h-full rounded-full"
                              style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
