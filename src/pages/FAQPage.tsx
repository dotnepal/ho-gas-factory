import type { SsgOptions } from 'vite-plugin-ssg/utils'

export const ssgOptions: SsgOptions = {
  slug: 'faq',
  routeUrl: '/faq',
  Head: () => (
    <>
      <title>FAQ — HO Gas Factory</title>
      <meta
        name="description"
        content="Frequently asked questions about gas safety, ordering, delivery, rental, and payment at HO Gas Factory."
      />
    </>
  ),
  context: async (children) => {
    const { StaticRouter } = await import('react-router-dom/server')
    const { withI18nProvider } = await import('../i18n/ssgContext')
    return withI18nProvider(<StaticRouter location="/faq">{children}</StaticRouter>)
  },
};

export default function FAQPage() {
  return (
    <main id="main-content" className="min-h-screen p-8">
      <h1 className="text-4xl font-display font-bold text-brand-blue">Frequently Asked Questions</h1>
      <p className="mt-4 font-body text-brand-steel">Coming soon — F-010</p>
    </main>
  )
}
