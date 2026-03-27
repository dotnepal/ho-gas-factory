import { useTranslation } from 'react-i18next'
import type { SupportedLang } from '../../i18n'

/**
 * Language toggle button — switches between English (en) and Nepali (ne).
 * Persists the selection to localStorage via i18next-browser-languagedetector.
 *
 * Used in: Navbar (F-004), and wherever a standalone toggle is needed.
 */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { i18n } = useTranslation()

  const currentLang = i18n.language.startsWith('ne') ? 'ne' : 'en'
  const nextLang: SupportedLang = currentLang === 'en' ? 'ne' : 'en'
  const label = currentLang === 'en' ? 'NP' : 'EN'

  function handleToggle() {
    i18n.changeLanguage(nextLang)
    document.documentElement.lang = nextLang === 'ne' ? 'ne' : 'en'
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${nextLang === 'ne' ? 'Nepali' : 'English'}`}
      className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 py-1 rounded-md border border-brand-blue text-brand-blue font-body font-medium text-sm hover:bg-brand-blue hover:text-white transition-colors ${className}`}
    >
      {label}
    </button>
  )
}
