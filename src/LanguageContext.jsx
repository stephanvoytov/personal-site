import { createContext, useContext, useState } from 'react'
import { ru, en } from './i18n'

const LangContext = createContext()

export function useLang() {
  return useContext(LangContext)
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ru')
  const t = lang === 'ru' ? ru : en
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}
