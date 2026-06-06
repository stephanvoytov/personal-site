import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLang } from '../LanguageContext'
import { projects } from '../data/projects'

const techColors = {
  TypeScript: '#3178C6', React: '#61DAFB', JavaScript: '#F7DF1E',
  'HTML / CSS': '#E34F26', Tailwind: '#06B6D4', Python: '#3776AB',
  Django: '#092E20', FastAPI: '#009688', Flask: '#000000',
  Docker: '#2496ED', PostgreSQL: '#4169E1', SQLite: '#003B57',
  aiogram: '#2F8FBB', Vite: '#646CFF', PyQt6: '#41CD52',
}

const typeIcons = {
  game: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  web: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  bot: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  desktop: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  tool: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
}

function TagBadge({ name }) {
  const color = techColors[name]
  return (
    <span
      className="px-2.5 py-0.5 text-[11px] font-medium rounded-md"
      style={{ background: color ? `${color}18` : 'rgba(255,255,255,0.05)', color: color || '#9ca3af' }}
    >
      {name}
    </span>
  )
}

function FeaturedCard({ project, p }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative col-span-full rounded-2xl overflow-hidden group"
      data-cursor="card"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-[#0a0a0f] to-teal-900/30" />
      <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[80%] rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="absolute bottom-[-20%] left-[-5%] w-[40%] h-[60%] rounded-full bg-teal-500/10 blur-[80px]" />

      <div className="relative z-10 p-8 md:p-12 lg:p-16">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-accent/20 text-accent-light border border-accent/30 uppercase tracking-wider">
            ★ {p.featured}
          </span>
          {project.modes?.map((mode) => (
            <span
              key={mode}
              className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-md uppercase tracking-wider"
              style={{
                background: mode === 'GUI' ? 'rgba(97,218,251,0.12)' : 'rgba(126,198,153,0.12)',
                color: mode === 'GUI' ? '#61DAFB' : '#7ec699',
                border: `1px solid ${mode === 'GUI' ? 'rgba(97,218,251,0.25)' : 'rgba(126,198,153,0.25)'}`,
              }}
            >
              {mode}
            </span>
          ))}
          {project.deployed && (
            <span className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-full bg-emerald-500/15 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {p.live}
            </span>
          )}
          <span className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-full bg-white/5 text-gray-400">
            {typeIcons[project.type]}
            {project.year}
          </span>
        </div>

        <div className="max-w-2xl">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            {project.title}
          </h3>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-6 max-w-xl">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => <TagBadge key={tag} name={tag} />)}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-[#0a0a0f] font-semibold rounded-xl transition-all duration-300 text-sm">
              {p.viewDemo}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 px-6 py-3 border border-[#1e2030] hover:border-[#2f3346] text-[#c0caf5] font-medium rounded-xl transition-all duration-300 hover:bg-[#1e2030]/30 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {p.source}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, index, inView, p }) {
  const clientColors = { School: '#f59e0b', Personal: '#34d399' }
  const clientColor = clientColors[project.client] || '#6b7280'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group glass rounded-xl overflow-hidden hover:border-accent/30 hover:shadow-[0_0_20px_rgba(52,211,153,0.06)] transition-all duration-500"
      data-cursor="card"
    >
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${clientColor}, ${clientColor}66)` }} />
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-4 h-4">{typeIcons[project.type]}</span>
            <span className="text-[12px]">{project.year}</span>
            {project.deployed && (
              <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                {p.live}
              </span>
            )}
          </div>
          <span className="px-2 py-0.5 text-[10px] font-medium rounded uppercase tracking-wider"
                style={{ background: `${clientColor}20`, color: clientColor }}>
            {project.client}
          </span>
        </div>

        <h3 className="text-base font-display font-semibold text-white mb-1.5 group-hover:text-accent-light transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => <TagBadge key={tag} name={tag} />)}
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-accent-light transition-colors">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {p.source}
          </a>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-accent-light transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {p.live}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLang()
  const p = t.projects
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const featured = projects.find((pr) => pr.featured)
  const rest = projects.filter((pr) => !pr.featured)

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/5 to-transparent" />
      <div className="container-section relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">
            {p.section}
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {p.heading}
          </h2>
          <p className="text-[#6b7280] max-w-xl mb-12 leading-relaxed">
            {p.desc}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured && <FeaturedCard project={featured} p={p} />}
            {rest.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} p={p} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
