import { useLang } from '../LanguageContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer id="footer" className="section-dim relative min-h-[12vh] min-h-[12dvh] flex items-center justify-center border-t border-[#1e2030]">
      <div className="container-section flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#565f89]">
          &copy; {new Date().getFullYear()} Stepan Voytov. {t.footer}
        </p>

        <a
          href="https://github.com/stephanvoytov"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#565f89] hover:text-accent transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
