import type { SsgOptions } from 'vite-plugin-ssg/utils'

export const ssgOptions: SsgOptions = {
  slug: 'contact',
  routeUrl: '/contact',
  Head: () => (
    <>
      <title>Contact Us — HO Gas Factory</title>
      <meta
        name="description"
        content="Get in touch with HO Gas Factory to place a gas order, request a quote, or ask about our services."
      />
    </>
  ),
  context: async (children) => {
    const { StaticRouter } = await import('react-router-dom/server')
    return <StaticRouter location="/contact">{children}</StaticRouter>
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen p-8">
      <h1 className="text-4xl font-display font-bold text-brand-blue">Get In Touch</h1>
      <p className="mt-4 font-body text-brand-steel">Coming soon — F-009</p>
    </main>
  )
}
