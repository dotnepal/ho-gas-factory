import type { SsgOptions } from 'vite-plugin-ssg/utils'

export const ssgOptions: SsgOptions = {
  slug: 'index',
  routeUrl: '/',
  Head: () => (
    <>
      <title>HO Gas Factory — Reliable Gas Supply for Medical & Industrial Use</title>
      <meta
        name="description"
        content="HO Gas Factory provides reliable oxygen, nitrogen, and hydrogen gas supply for hospitals, medical facilities, and industrial users across Nepal."
      />
    </>
  ),
  context: async (children) => {
    const { StaticRouter } = await import('react-router-dom/server')
    return <StaticRouter location="/">{children}</StaticRouter>
  },
};

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <section className="flex items-center justify-center h-96 bg-brand-light">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-brand-blue mb-4">
            HO Gas Factory
          </h1>
          <p className="text-lg font-body text-brand-steel">
            Reliable Gas Supply for Medical &amp; Industrial Use
          </p>
        </div>
      </section>
    </main>
  )
}
