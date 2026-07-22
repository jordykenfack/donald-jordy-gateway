import { brand } from '../config/portfolios';

// Minimal shared brand bar. Sits above the split without competing with it:
// the two panels remain the dominant actions.
export default function TopNav() {
  const linkClass =
    'text-[13px] font-medium tracking-wide text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60';

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 md:py-6"
      >
        <a
          href="#"
          className="pointer-events-auto font-display text-sm font-semibold uppercase tracking-[0.28em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
        >
          {brand.name}
        </a>
        <div className="pointer-events-auto flex items-center gap-6 md:gap-8">
          <a href={brand.links.about} className={linkClass}>
            About
          </a>
          <a href={brand.links.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
            LinkedIn
          </a>
          <a href={brand.links.contact} className={linkClass}>
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
