import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'
import { skillCategories } from '../data/projects'

const tagVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.04, duration: 0.25, ease: 'easeOut' },
  }),
}

export default function Skills() {
  const { t } = useLang()
  const s = t.skills
  const catLabels = [s.catFrontend, s.catBackend, s.catDevOps]

  return (
    <section id="skills" className="section-mid relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent pointer-events-none" />
      <div className="container-section py-24 md:py-32">
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
              className="glass rounded-xl p-6 relative group"
              data-cursor="card"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h3 className="text-sm font-semibold text-[#c0caf5] mb-4 relative">
                {catLabels[ci] || cat.name}
              </h3>
              <div className="flex flex-wrap gap-2 relative">
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    custom={i}
                    variants={tagVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    data-cursor="code"
                    className="px-3 py-1.5 text-xs font-mono rounded-lg border border-[#1e2030] text-[#565f89] hover:border-accent/40 hover:text-accent hover:shadow-[0_0_12px_rgba(52,211,153,0.1)] transition-all duration-200"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
