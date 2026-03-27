/**
 * Shared SSG context helper.
 *
 * During SSG (vite-plugin-ssg static prerender), the `main.tsx` entry is not
 * executed, so the default i18next instance isn't set up via initReactI18next.
 * Wrapping each page's context tree with I18nextProvider fixes the warning and
 * ensures `t()` resolves keys (falling back to 'en') during prerender.
 */
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'
import i18n from './index'

export function withI18nProvider(children: ReactNode): ReactNode {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
