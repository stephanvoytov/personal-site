import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLang } from '../LanguageContext'
import { en } from '../i18n'

const promptStr = 'stephan@portfolio:~$ '
const FS = 13

const charPattern = [48, 38, 58, 42, 52, 32, 62, 45, 38, 55, 42, 60, 36, 52, 46, 42]

const getCharDelays = (length) =>
  Array.from({ length }, (_, i) => charPattern[i % charPattern.length])

const calcTimings = (sessions) => {
  const result = []
  let t = 200
  for (const session of sessions) {
    const promptTime = t
    t += 350
    const cmdStart = t
    const charDelays = getCharDelays(session.cmd.length)
    for (const d of charDelays) t += d
    const totalTypingTime = t - cmdStart
    t += 180
    const outTime = t
    t += 250
    result.push({ promptTime, cmdStart, totalTypingTime, charDelays, outTime })
  }
  return { sessions: result, total: t + 300 }
}

export default function Terminal() {
  const { lang, t } = useLang()
  const sessions = lang === 'en' ? t.terminal.sessions : en.terminal.sessions
  const timing = calcTimings(sessions)
  const [elapsed, setElapsed] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const raf = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!inView) return
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
  }, [inView, t.terminal.sessions])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [elapsed])

  const renderLines = () => {
    const out = []

    for (let i = 0; i < sessions.length; i++) {
      const s = timing.sessions[i]
      const session = sessions[i]
      if (elapsed < s.promptTime) break

      let cmdShown = ''
      let isTyping = false
      let execPause = false

      if (elapsed >= s.cmdStart) {
        const typingElapsed = elapsed - s.cmdStart
        if (typingElapsed < s.totalTypingTime) {
          let charsToShow = 0
          let acc = 0
          for (let c = 0; c < session.cmd.length; c++) {
            acc += s.charDelays[c]
            if (acc <= typingElapsed) charsToShow = c + 1
          }
          cmdShown = session.cmd.slice(0, charsToShow)
          isTyping = true
        } else {
          cmdShown = session.cmd
          execPause = elapsed < s.outTime
        }
      }

      const showOut = elapsed >= s.outTime

      out.push({
        prompt: promptStr,
        cmd: cmdShown,
        isTyping,
        execPause,
        showOut,
        out: showOut ? session.out : '',
      })
    }

    const allDone = elapsed >= timing.total
    const last = out[out.length - 1]

    let showCursorOnNewPrompt = false
    if (out.length > 0 && last.showOut && !allDone) {
      showCursorOnNewPrompt = true
    }

    return { out, allDone, showCursorOnNewPrompt }
  }

  const { out, allDone, showCursorOnNewPrompt } = renderLines()

  return (
    <section id="terminal" className="relative py-24 md:py-32">
      <div className="container-section">
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
                border: '1px solid #2f3346',
                background: '#1a1b26',
              }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5 select-none"
                style={{ background: '#1e2030', borderBottom: '1px solid #2f3346' }}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: '#f7768e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#e0af68' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#9ece6a' }} />
                <span className="ml-4 text-xs font-mono" style={{ color: '#565f89' }}>
                  stephan@portfolio: ~
                </span>
              </div>

              <div
                ref={scrollRef}
                className="overflow-y-auto"
                style={{
                  background: '#1a1b26',
                  maxHeight: '380px',
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
                    minHeight: '280px',
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
                  }}
                >
                  {out.map((line, i) => (
                    <div key={i}>
                      <div className="whitespace-pre-wrap break-all">
                        <span style={{ color: '#7ec699' }}>{line.prompt}</span>
                        <span style={{ color: '#c0caf5' }}>{line.cmd}</span>
                        {(line.isTyping || line.execPause) && <span className="cursor-block" />}
                      </div>
                      {line.showOut && (
                        <div className="whitespace-pre-wrap" style={{ color: '#a9b1d6' }}>
                          {line.out.split('\n').map((l, j) => (
                            <div key={j}>{l}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {out.length === 0 && <span className="cursor-block" />}

                  {showCursorOnNewPrompt && (
                    <div className="whitespace-pre-wrap break-all">
                      <span style={{ color: '#7ec699' }}>{promptStr}</span>
                      <span className="cursor-block" />
                    </div>
                  )}

                  {allDone && (
                    <div className="whitespace-pre-wrap break-all">
                      <span style={{ color: '#7ec699' }}>{promptStr}</span>
                      <span className="cursor-block" />
                    </div>
                  )}

                  <style>{`
                    .cursor-block {
                      display: inline-block;
                      width: 7px;
                      height: 15px;
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
