import { brand } from '../config/portfolios';

// Minimal shared brand bar. Sits above the split without competing with it.
// Green text so it reads on both the cream (left) and dark (right) panels.
export default function TopNav() {
  const linkClass =
    'text-[15px] font-medium tracking-tight text-[#1a7f57]/85 transition-colors duration-200 hover:text-[#14603f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7f57]';

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-6 py-5 md:px-10 md:py-6"
      >
        <a
          href="#"
          className="pointer-events-auto font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1a7f57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7f57] md:text-sm md:tracking-[0.28em]"
        >
          {brand.name}
        </a>
        <div className="pointer-events-auto flex items-center gap-4 md:gap-8">
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
