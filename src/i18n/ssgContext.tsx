/**
 * Shared SSG context helpers.
 *
 * During SSG (vite-plugin-ssg static prerender), the `main.tsx` entry is not
 * executed, so the default i18next instance isn't set up via initReactI18next.
 * Wrapping each page's context tree with I18nextProvider fixes the warning and
 * ensures `t()` resolves keys (falling back to 'en') during prerender.
 *
 * withSSGLayout also injects Navbar + Footer into the pre-rendered HTML so the
 * static build matches the runtime RootLayout (App.tsx). Without this, the
 * navbar is missing from dist/ HTML files and only appears after JS hydration.
 */
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'
import i18n from './index'

export function withI18nProvider(children: ReactNode): ReactNode {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

/**
 * Full-page SSG wrapper: I18nextProvider + StaticRouter + Navbar + children + Footer.
 * Use this in every page's ssgOptions.context() instead of withI18nProvider alone.
 */
export async function withSSGLayout(children: ReactNode, routeUrl: string): Promise<ReactNode> {
  const { StaticRouter } = await import('react-router-dom/server')
  const { default: Navbar } = await import('../components/layout/Navbar')
  const { default: Footer } = await import('../components/layout/Footer')

  return (
    <I18nextProvider i18n={i18n}>
      <StaticRouter location={routeUrl}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-md focus:font-body"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </StaticRouter>
    </I18nextProvider>
  )
}
