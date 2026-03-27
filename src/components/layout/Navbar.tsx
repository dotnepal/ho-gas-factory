import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../routes'
import { useScrolled } from '../../hooks/useScrolled'
import LanguageToggle from '../ui/LanguageToggle'
import Button from '../ui/Button'

// ─── Desktop nav link ──────────────────────────────────────────────────────

function DesktopNavLink({
  to,
  children,
  transparent,
}: {
  to: string
  children: React.ReactNode
  transparent: boolean
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        [
          'relative font-body font-medium text-sm transition-colors duration-200 pb-0.5',
          'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full after:transition-all after:duration-200',
          transparent
            ? isActive
              ? 'text-white after:w-full after:bg-white'
              : 'text-white/80 hover:text-white after:w-0 after:bg-white hover:after:w-full'
            : isActive
              ? 'text-brand-blue after:w-full after:bg-brand-blue'
              : 'text-brand-dark hover:text-brand-blue after:w-0 after:bg-brand-blue hover:after:w-full',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  )
}

// ─── Mobile nav link ───────────────────────────────────────────────────────

function MobileNavLink({
  to,
  children,
  onClick,
}: {
  to: string
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'flex items-center px-4 py-3 rounded-xl font-body font-medium text-base transition-all duration-150',
          isActive
            ? 'bg-brand-light text-brand-blue font-semibold'
            : 'text-brand-dark hover:bg-brand-light/70 hover:text-brand-blue',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  )
}

// ─── Hamburger / Close icon ────────────────────────────────────────────────

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200"
    >
      {open ? (
        // X icon
        <>
          <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        // Hamburger icon
        <>
          <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { t } = useTranslation()
  const scrolled = useScrolled(20)
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // Close drawer on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        hamburgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Trap focus inside drawer when open
  useEffect(() => {
    if (!isOpen) return
    const drawer = drawerRef.current
    if (!drawer) return

    const focusables = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    function trapTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    drawer.addEventListener('keydown', trapTab)
    first?.focus()
    return () => drawer.removeEventListener('keydown', trapTab)
  }, [isOpen])

  function closeDrawer() {
    setIsOpen(false)
    hamburgerRef.current?.focus()
  }

  const transparent = !scrolled

  return (
    <header>
      {/* ── Main bar ───────────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white shadow-nav'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Logo: white text when transparent, brand colors when scrolled */}
          <NavLink
            to="/"
            aria-label="HO Gas Factory — Home"
            className="flex items-center gap-2 select-none"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <ellipse cx="16" cy="7" rx="9" ry="4" fill={transparent ? 'white' : 'var(--color-brand-blue)'} />
              <rect x="7" y="7" width="18" height="16" fill={transparent ? 'white' : 'var(--color-brand-blue)'} />
              <ellipse cx="16" cy="23" rx="9" ry="4" fill={transparent ? 'rgba(255,255,255,0.7)' : 'var(--color-brand-dark)'} />
              <ellipse cx="16" cy="7" rx="9" ry="4" fill={transparent ? 'rgba(255,255,255,0.4)' : 'var(--color-brand-accent)'} opacity="0.6" />
              <rect x="13" y="2" width="6" height="3" rx="1.5" fill={transparent ? 'rgba(255,255,255,0.6)' : 'var(--color-brand-dark)'} />
            </svg>
            <span className="font-display font-bold leading-none">
              <span className={transparent ? 'text-white text-xl' : 'text-brand-blue text-xl'}>HO</span>
              <span className={transparent ? 'text-white/80 text-lg' : 'text-brand-dark text-lg'}> Gas Factory</span>
            </span>
          </NavLink>

          {/* Desktop links */}
          <ul
            role="list"
            className="hidden md:flex items-center gap-8"
          >
            {ROUTES.map((route) => (
              <li key={route.path}>
                <DesktopNavLink to={route.path} transparent={transparent}>
                  {t(route.labelKey)}
                </DesktopNavLink>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* CTA button — desktop only */}
            {transparent ? (
              <a
                href="/contact"
                className="hidden md:inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-4 py-2 rounded-md min-h-[44px] border-2 border-white text-white bg-transparent hover:bg-white/15 transition-all duration-200 select-none"
              >
                {t('common.contactUs')}
              </a>
            ) : (
              <Button as="a" href="/contact" size="sm" className="hidden md:inline-flex">
                {t('common.contactUs')}
              </Button>
            )}

            {/* Language toggle — visible on all sizes */}
            <LanguageToggle transparent={transparent} />

            {/* Hamburger — mobile only */}
            <button
              ref={hamburgerRef}
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
              onClick={() => setIsOpen((v) => !v)}
              className={[
                'md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg transition-colors',
                transparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-brand-dark hover:bg-brand-light',
              ].join(' ')}
            >
              <MenuIcon open={isOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ──────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className={[
          'fixed inset-0 z-40 bg-brand-dark/40 backdrop-blur-sm md:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Drawer panel */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className={[
          'fixed top-0 right-0 h-full w-72 z-50 md:hidden',
          'bg-white shadow-2xl flex flex-col',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <NavLink to="/" aria-label="HO Gas Factory — Home" className="flex items-center gap-2 select-none" onClick={closeDrawer}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
              <ellipse cx="16" cy="7" rx="9" ry="4" fill="var(--color-brand-blue)" />
              <rect x="7" y="7" width="18" height="16" fill="var(--color-brand-blue)" />
              <ellipse cx="16" cy="23" rx="9" ry="4" fill="var(--color-brand-dark)" />
              <ellipse cx="16" cy="7" rx="9" ry="4" fill="var(--color-brand-accent)" opacity="0.6" />
              <rect x="13" y="2" width="6" height="3" rx="1.5" fill="var(--color-brand-dark)" />
            </svg>
            <span className="font-display font-bold leading-none">
              <span className="text-brand-blue text-xl">HO</span>
              <span className="text-brand-dark text-lg"> Gas Factory</span>
            </span>
          </NavLink>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeDrawer}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-brand-dark hover:bg-brand-light transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {ROUTES.map((route) => (
            <MobileNavLink key={route.path} to={route.path} onClick={closeDrawer}>
              {t(route.labelKey)}
            </MobileNavLink>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-body text-brand-steel">Language</span>
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}
