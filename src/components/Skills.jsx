import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'
import { skillCategories } from '../data/projects'

export default function Skills() {
  const { t } = useLang()
  const s = t.skills
  const catLabels = [s.catFrontend, s.catBackend, s.catDevOps]

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">
            {s.section}
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
            {s.heading}
          </h2>
          <p className="text-sm text-[#6b7280] mb-12 max-w-lg">
            {s.desc}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.15, duration: 0.5 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-sm font-semibold text-[#c0caf5] mb-4">
                {catLabels[ci] || cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 text-xs font-mono rounded-lg border border-[#1e2030] text-[#565f89] hover:border-accent/30 hover:text-accent transition-all duration-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
