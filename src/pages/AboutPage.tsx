import { useTranslation } from 'react-i18next'
import type { SsgOptions } from 'vite-plugin-ssg/utils'
import { Button, Card, Badge, SectionHeader, PageHero } from '../components/ui'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

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
    const { withSSGLayout } = await import('../i18n/ssgContext')
    return withSSGLayout(children, '/about')
  },
};

// ─── Static data ────────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    name: 'Ram Prasad Shrestha',
    role: 'Founder & Managing Director',
    photo: 'https://placehold.co/280x280/1e3a5f/ffffff?text=R.P.S',
  },
  {
    name: 'Sita Kumari Rai',
    role: 'Operations Manager',
    photo: 'https://placehold.co/280x280/1e40af/ffffff?text=S.K.R',
  },
  {
    name: 'Dipesh Tamang',
    role: 'Safety & Compliance Officer',
    photo: 'https://placehold.co/280x280/3b82f6/ffffff?text=D.T',
  },
  {
    name: 'Anita Gurung',
    role: 'Customer Relations Lead',
    photo: 'https://placehold.co/280x280/1e3a5f/e0f2fe?text=A.G',
  },
] as const

const WHY_US_ICONS = {
  safety: (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
      <path
        d="M20 4L6 10v10c0 8.284 5.948 15.978 14 18 8.052-2.022 14-9.716 14-18V10L20 4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polyline
        points="13,21 18,26 27,15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  certified: (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
      <polyline
        points="13,20 18,25 27,14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
      <rect x="2" y="12" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M26 16h6l4 6v6h-10V16z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="30" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="30" cy="30" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 12v8l5 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function AboutHero() {
  const { t } = useTranslation()
  return (
    <PageHero
      title={t('about.hero.title')}
      subtitle={t('about.hero.subtitle')}
    />
  )
}

// ─── Company Story ──────────────────────────────────────────────────────────

function CompanyStory() {
  const { t } = useTranslation()
  const ref = useScrollAnimation<HTMLDivElement>()

  return (
    <section aria-label="Our Story" className="py-20 px-6 bg-white">
      <div ref={ref} className="animate-on-scroll max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader
            eyebrow="Since 2005"
            title={t('about.story.title')}
            align="left"
            className="mb-6"
          />
          <p className="font-body text-brand-steel leading-relaxed text-base sm:text-lg">
            {t('about.story.body')}
          </p>
          <div className="mt-8">
            <Button as="a" href="/contact" size="md">
              {t('common.contactUs')}
            </Button>
          </div>
        </div>

        <div className="hidden lg:block">
          <img
            src="https://placehold.co/540x380/1e3a5f/ffffff?text=Our+Facility"
            alt="HO Gas Factory facility"
            width={540}
            height={380}
            className="rounded-2xl shadow-card w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

// ─── Team Grid ──────────────────────────────────────────────────────────────

function TeamGrid() {
  const { t } = useTranslation()
  const headerRef = useScrollAnimation<HTMLDivElement>()
  const gridRef = useScrollAnimation<HTMLDivElement>({ stagger: 100 })

  return (
    <section
      aria-label="Our Team"
      className="py-20 px-6"
      style={{ background: 'var(--color-brand-light)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="animate-on-scroll mb-12">
          <SectionHeader
            title={t('about.team.title')}
            align="center"
          />
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <Card key={member.name} hover as="article" flush className="animate-on-scroll flex flex-col">
              <img
                src={member.photo}
                alt={member.name}
                width={280}
                height={280}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-display font-bold text-brand-dark text-base leading-snug">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-brand-steel">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Service Areas ──────────────────────────────────────────────────────────

const AREA_ICONS = {
  local: '📍',
  regional: '🗺️',
  national: '🇳🇵',
} as const

function ServiceAreas() {
  const { t } = useTranslation()
  const areas = ['local', 'regional', 'national'] as const
  const headerRef = useScrollAnimation<HTMLDivElement>()
  const badgesRef = useScrollAnimation<HTMLDivElement>({ stagger: 100 })

  return (
    <section aria-label="Service Areas" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="animate-on-scroll mb-10">
          <SectionHeader
            title={t('about.areas.title')}
            align="center"
          />
        </div>
        <div ref={badgesRef} className="flex flex-wrap justify-center gap-4">
          {areas.map((area) => (
            <Badge key={area} variant="primary" className="animate-on-scroll gap-2 px-6 py-3 text-base">
              <span aria-hidden="true">{AREA_ICONS[area]}</span>
              {t(`about.areas.${area}`)}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why Choose Us ──────────────────────────────────────────────────────────

function WhyChooseUs() {
  const { t } = useTranslation()
  const items = ['safety', 'certified', 'delivery', 'support'] as const
  const headerRef = useScrollAnimation<HTMLDivElement>()
  const gridRef = useScrollAnimation<HTMLDivElement>({ stagger: 100 })

  return (
    <section
      aria-label="Why Choose Us"
      className="py-20 px-6"
      style={{ background: 'var(--color-brand-light)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="animate-on-scroll mb-12">
          <SectionHeader
            title={t('about.whyUs.title')}
            align="center"
          />
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <Card key={item} hover as="article" className="animate-on-scroll flex flex-col items-start gap-4">
              <div className="p-3 rounded-xl bg-brand-light text-brand-blue">
                {WHY_US_ICONS[item]}
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-brand-dark">
                  {t(`about.whyUs.${item}`)}
                </h3>
                <p className="mt-1 font-body text-sm text-brand-steel leading-relaxed">
                  {t(`about.whyUs.${item}Desc`)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main id="main-content" className="page-transition">
      <AboutHero />
      <CompanyStory />
      <TeamGrid />
      <ServiceAreas />
      <WhyChooseUs />
    </main>
  )
}
