import { Suspense, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from './routes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// ─── Root layout shell ─────────────────────────────────────────────────────
function RootLayout() {
  const { i18n } = useTranslation()

  // Keep <html lang="..."> in sync with the active language.
  // Also syncs data-lang attribute (used by FOUC-prevention CSS) and adds
  // lang-ready class to reveal #root once the correct language is rendered.
  useEffect(() => {
    const isNepali = i18n.language.startsWith('ne')
    document.documentElement.lang = isNepali ? 'ne' : 'en'
    document.documentElement.setAttribute('data-lang', isNepali ? 'ne' : 'en')
    document.documentElement.classList.add('lang-ready')
  }, [i18n.language])

  return (
    <>
      <ScrollRestoration />
      {/* Skip-to-content link for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-md focus:font-body"
      >
        Skip to content
      </a>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: ROUTES.map((route) => ({
      path: route.path === '/' ? undefined : route.path,
      index: route.path === '/',
      element: (
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <route.component />
        </Suspense>
      ),
    })),
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
