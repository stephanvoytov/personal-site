import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLang } from '../LanguageContext'
import { en } from '../i18n'

const FS = 13

// Паттерны скорости: короткие команды быстрее
const fastPattern = [60, 40, 30, 22, 18]
const slowPattern = [75, 58, 45, 38, 32, 28, 26, 22, 20, 18, 16]

const getCharDelays = (cmd) => {
  const base = cmd.length < 10 ? fastPattern : slowPattern
  return Array.from({ length: cmd.length }, (_, i) => base[i % base.length])
}

// Планировщик команд
const calcTimings = (sessions) => {
  const result = []
  let t = 200

  for (const session of sessions) {
    const promptTime = t
    t += 350

    const cmdStart = t
    const charDelays = getCharDelays(session.cmd)
    for (const d of charDelays) t += d
    const typingEnd = t

    t += 250 // пауза перед Enter — команда напечатана, курсор моргает
    const enterTime = t

    t += 120 // "нажатие Enter"
    const execEnd = t

    // Планируем построчный вывод
    const outLines = session.out.split('\n')
    const outSchedule = []
    for (let li = 0; li < outLines.length; li++) {
      outSchedule.push({ time: t, text: outLines[li] })
      t += 100 + li * 12 // детерминированная задержка
    }
    const outEnd = t

    t += 250 // межсессионная пауза

    result.push({
      promptTime, cmdStart, typingEnd, enterTime,
      charDelays, execEnd,
      outSchedule, outEnd,
    })
  }

  return { sessions: result, total: t + 200 }
}

// Цветной вывод
function OutputLine({ text }) {
  const t = text.trim()
  if (/^\d+ repos/i.test(t) || /^\d+ репозиториев/i.test(t)) {
    return <div className="whitespace-pre"><span style={{ color: '#bb9af7' }}>{text}</span></div>
  }
  if (t === 'stephan' || t.includes('coding since') || t.includes('всегда строю')) {
    return <div className="whitespace-pre"><span style={{ color: '#e0af68' }}>{text}</span></div>
  }
  if (t.startsWith('TUI') || t.startsWith('GUI') || t.includes('·')) {
    return <div className="whitespace-pre"><span style={{ color: '#7ec699' }}>{text}</span></div>
  }
  // ls -G: цветные имена проектов
  if (text.startsWith('  ')) {
    const colors = ['#7ec699', '#61DAFB', '#f7768e', '#e0af68', '#bb9af7', '#9ece6a', '#2dd4bf', '#f59e0b']
    const parts = text.trim().split(/\s+/)
    return (
      <div className="whitespace-pre" style={{ color: '#565f89' }}>
        {parts.map((p, i) => (
          <span key={i}>
            {i > 0 ? '  ' : ''}
            <span style={{ color: colors[i % colors.length] }}>{p}</span>
          </span>
        ))}
      </div>
    )
  }
  return <div className="whitespace-pre" style={{ color: '#a9b1d6' }}>{text}</div>
}

export default function Terminal() {
  const { lang, t } = useLang()
  const sessions = lang === 'en' ? t.terminal.sessions : en.terminal.sessions
  const timing = useMemo(() => calcTimings(sessions), [sessions])
  const [elapsed, setElapsed] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const raf = useRef(null)
  const scrollRef = useRef(null)

  const startAnimation = () => {
    setElapsed(0)
    const delay = setTimeout(() => {
      const start = performance.now()
      const tick = () => {
        const e = performance.now() - start
        setElapsed(Math.min(e, timing.total))
        if (e < timing.total) raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    }, 300)
    return () => { clearTimeout(delay); if (raf.current) cancelAnimationFrame(raf.current) }
  }

  useEffect(() => {
    if (!inView) return
    const cleanup = startAnimation()
    return cleanup
  }, [inView, timing.total])

  // Плавный скролл
  useEffect(() => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const target = el.scrollHeight
    const current = el.scrollTop
    const diff = target - current
    if (diff > 20) {
      el.scrollTop = current + Math.min(diff * 0.08 + 0.5, 10)
    } else {
      el.scrollTop = target
    }
  }, [elapsed])

  const renderLines = () => {
    const out = []
    for (let i = 0; i < sessions.length; i++) {
      const s = timing.sessions[i]
      const ses = sessions[i]
      if (elapsed < s.promptTime) break

      // Команда
      let cmdShown = ''
      let showCur = false // cursor visible?
      let waitMessage = '' // waiting/executing message

      if (elapsed < s.cmdStart) {
        // Prompt показан, ждём ввод — курсор моргает
        showCur = true
        waitMessage = ''
      } else if (elapsed >= s.cmdStart && elapsed < s.typingEnd) {
        // Печатает команду
        const typingElapsed = elapsed - s.cmdStart
        let charsToShow = 0
        let acc = 0
        for (let c = 0; c < ses.cmd.length; c++) {
          acc += s.charDelays[c]
          if (acc <= typingElapsed) charsToShow = c + 1
        }
        cmdShown = ses.cmd.slice(0, charsToShow)
        showCur = true
        waitMessage = ''
      } else if (elapsed >= s.typingEnd) {
        cmdShown = ses.cmd
        if (elapsed < s.enterTime) {
          // Команда напечатана, ждём Enter — курсор моргает, сообщений нет
          showCur = true
          waitMessage = ''
        } else if (elapsed < s.execEnd) {
          // Enter нажат — executing
          showCur = true
          waitMessage = '⏳ executing...'
        } else {
          showCur = false
          waitMessage = ''
        }
      }

      // Вывод — строки по расписанию
      const shownLines = []
      for (const line of s.outSchedule) {
        if (elapsed >= line.time) shownLines.push(line.text)
      }
      const outComplete = shownLines.length === s.outSchedule.length

      out.push({
        cmd: cmdShown, showCur, waitMessage, shownLines, outComplete,
      })
    }

    const allDone = elapsed >= timing.total
    const last = out[out.length - 1]
    let showCursor = false
    if (out.length > 0 && last?.outComplete && !allDone) showCursor = true

    return { out, allDone, showCursor }
  }

  const { out, allDone, showCursor } = renderLines()

  const restart = () => {
    if (raf.current) cancelAnimationFrame(raf.current)
    startAnimation()
  }

  return (
    <section id="terminal" className="section-dark relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container-section py-24 md:py-32">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-sm font-medium text-accent-light mb-2 tracking-wider uppercase">
            {t.terminal.section}
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-10">
            {t.terminal.heading}{' '}
            <span className="gradient-text">{t.terminal.headingAccent}</span>
          </h2>

          <div className="mx-auto max-w-3xl select-text">
            <div
              className="rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(122, 162, 247, 0.03)',
                border: '1px solid #2f3346', background: '#1a1b26',
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center justify-between px-4 py-2.5 select-none"
                style={{ background: '#1e2030', borderBottom: '1px solid #2f3346' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: '#f7768e' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#e0af68' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#9ece6a' }} />
                  <span className="ml-4 text-xs font-mono" style={{ color: '#565f89' }}>
                    stephan@portfolio: ~
                  </span>
                </div>
                <button
                  onClick={restart}
                  className="px-2 py-1 text-[10px] font-mono rounded hover:bg-white/5 transition-colors"
                  style={{ color: '#565f89' }}
                  title="Restart"
                >
                  ↻
                </button>
              </div>

              {/* Terminal body */}
              <div
                ref={scrollRef}
                className="overflow-y-auto"
                style={{
                  background: '#1a1b26',
                  maxHeight: '420px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#2f3346 transparent',
                }}
              >
                <div
                  className="p-4 md:p-5 font-mono"
                  style={{
                    fontSize: `${FS}px`,
                    lineHeight: 1.45,
                    color: '#c0caf5',
                    minHeight: '300px',
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
                  }}
                >
                  {out.map((line, i) => (
                    <div key={i}>
                      <div className="whitespace-pre-wrap break-all">
                        <span style={{ color: '#7ec699' }}>stephan</span>
                        <span style={{ color: '#565f89' }}>@portfolio</span>
                        <span style={{ color: '#7ec699' }}>:~$ </span>
                        <span style={{ color: '#c0caf5' }}>{line.cmd}</span>
                        {line.showCur && <span className="cursor-block" />}
                      </div>

                      {line.shownLines.length > 0 && (
                        <div>
                          {line.shownLines.map((text, j) => (
                            <OutputLine key={j} text={text} />
                          ))}
                        </div>
                      )}

                      {line.waitMessage && (
                        <div className="text-[10px] mt-0.5" style={{ color: '#565f89' }}>
                          {line.waitMessage}
                        </div>
                      )}
                    </div>
                  ))}

                  {out.length === 0 && <span className="cursor-block" />}

                  {showCursor && (
                    <div className="whitespace-pre-wrap break-all">
                      <span style={{ color: '#7ec699' }}>stephan</span>
                      <span style={{ color: '#565f89' }}>@portfolio</span>
                      <span style={{ color: '#7ec699' }}>:~$ </span>
                      <span className="cursor-block" />
                    </div>
                  )}

                  {allDone && (
                    <>
                      <div className="whitespace-pre-wrap break-all">
                        <span style={{ color: '#7ec699' }}>stephan</span>
                        <span style={{ color: '#565f89' }}>@portfolio</span>
                        <span style={{ color: '#7ec699' }}>:~$ </span>
                        <span className="cursor-block" />
                      </div>
                      <div className="mt-3 text-[10px] text-center" style={{ color: '#2f3346' }}>
                        [Session completed · click ↻ to restart]
                      </div>
                    </>
                  )}

                  <style>{`
                    .cursor-block {
                      display: inline-block;
                      width: 7px; height: 15px;
                      background: #7ec699;
                      vertical-align: text-bottom;
                      margin-left: 1px;
                      animation: blink 1s step-end infinite;
                    }
                    @keyframes blink {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0; }
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
