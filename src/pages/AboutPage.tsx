import type { SsgOptions } from 'vite-plugin-ssg/utils'

export const ssgOptions: SsgOptions = {
  slug: 'about',
  routeUrl: '/about',
  Head: () => (
    <>
      <title>About Us — HO Gas Factory</title>
      <meta
        name="description"
        content="Learn about HO Gas Factory — our story, team, and commitment to safe, reliable gas supply across Nepal."
      />
    </>
  ),
  context: async (children) => {
    const { StaticRouter } = await import('react-router-dom/server')
    return <StaticRouter location="/about">{children}</StaticRouter>
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen p-8">
      <h1 className="text-4xl font-display font-bold text-brand-blue">About HO Gas Factory</h1>
      <p className="mt-4 font-body text-brand-steel">Coming soon — F-007</p>
    </main>
  )
}
