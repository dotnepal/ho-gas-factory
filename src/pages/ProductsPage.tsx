import type { SsgOptions } from 'vite-plugin-ssg/utils'

export const ssgOptions: SsgOptions = {
  slug: 'products',
  routeUrl: '/products',
  Head: () => (
    <>
      <title>Products & Services — HO Gas Factory</title>
      <meta
        name="description"
        content="Explore oxygen, nitrogen, and hydrogen gas cylinders available for rent and sale. Refilling, bulk orders, and delivery services across Nepal."
      />
    </>
  ),
  context: async (children) => {
    const { StaticRouter } = await import('react-router-dom/server')
    return <StaticRouter location="/products">{children}</StaticRouter>
  },
};

export default function ProductsPage() {
  return (
    <main id="main-content" className="min-h-screen p-8">
      <h1 className="text-4xl font-display font-bold text-brand-blue">Our Products &amp; Services</h1>
      <p className="mt-4 font-body text-brand-steel">Coming soon — F-008</p>
    </main>
  )
}
