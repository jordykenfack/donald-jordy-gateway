import { forwardRef } from 'react';
import type { PortfolioKey, PortfolioPath } from '../config/portfolios';
import Slideshow from './Slideshow';
import { aiSlides, dataSlides } from '../data/slides';

interface PanelProps {
  variant: PortfolioKey;
  data: PortfolioPath;
  href: string;
  index: number;
  active: boolean;
  previewLabel: string;
  onEnter: () => void;
  onLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

// Each panel is a single semantic anchor so the whole surface is clickable,
// keyboard-focusable, and activatable with Enter — no click handlers on
// non-semantic containers. Background is a full-cover image slideshow; the
// copy sits in an editorial grid over a readability scrim.
const Panel = forwardRef<HTMLAnchorElement, PanelProps>(function Panel(
  { variant, data, href, index, active, previewLabel, onEnter, onLeave, onFocus, onBlur },
  ref,
) {
  const isData = variant === 'dataScience';

  return (
    <a
      ref={ref}
      href={href}
      data-panel={variant}
      aria-label={`${data.title} — ${data.cta}. ${previewLabel}.`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={[
        'panel group relative flex min-h-0 flex-1 flex-col justify-end overflow-hidden',
        'no-underline outline-none transition-[box-shadow] duration-300',
        'focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-inset',
        isData
          ? 'bg-data-base text-white focus-visible:ring-data-cyan'
          : 'bg-studio-base text-white focus-visible:ring-studio-accent',
        'min-h-[68svh] md:min-h-0',
      ].join(' ')}
    >
      {/* full-cover slideshow background */}
      <div
        className="panel-backdrop absolute inset-0 transition-opacity duration-500"
        style={{ opacity: active ? 1 : 0.82 }}
      >
        <Slideshow images={isData ? dataSlides : aiSlides} active={active} />
      </div>

      {/* readability scrims: darken overall + strong at the bottom */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/10" />
      <div
        aria-hidden
        className={[
          'panel-wash pointer-events-none absolute inset-0',
          isData
            ? 'bg-gradient-to-t from-data-base via-data-base/80 via-32% to-transparent'
            : 'bg-gradient-to-t from-studio-base via-studio-base/80 via-32% to-transparent',
        ].join(' ')}
      />
      <div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05]" />

      {/* honest environment label */}
      <div className="pointer-events-none absolute left-8 top-[92px] z-10 flex items-center gap-2 md:left-12 md:top-28 lg:left-16">
        <span className={`relative flex h-1.5 w-1.5 ${isData ? 'text-data-cyan' : 'text-studio-accent'}`}>
          <span className="absolute inline-flex h-full w-full animate-node rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">{previewLabel}</span>
      </div>

      {/* content — editorial grid */}
      <div className="panel-content relative z-10 grid grid-cols-1 items-end gap-x-8 gap-y-4 p-8 md:grid-cols-2 md:p-12 lg:p-16">
        {/* left cell: eyebrow + title */}
        <div className="flex flex-col gap-3">
          <span
            className={[
              'font-mono text-[11px] font-medium uppercase tracking-[0.32em]',
              isData ? 'text-data-cyan' : 'text-studio-accent',
            ].join(' ')}
          >
            <span className="mr-3 opacity-50">0{index + 1}</span>
            {data.label}
          </span>
          <h2 className="panel-title font-display text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.02em] [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]">
            {data.title}
          </h2>
        </div>

        {/* right cell: description + CTA */}
        <div className="flex flex-col gap-4 md:pb-1.5">
          <p className="panel-desc max-w-md text-[clamp(0.95rem,1.15vw,1.15rem)] leading-relaxed text-white/80 [text-shadow:0_1px_16px_rgba(0,0,0,0.7)]">
            {data.description}
          </p>
          <span
            className={[
              'panel-cta inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-all duration-300',
              isData
                ? 'border-data-cyan/50 bg-data-base/40 text-white group-hover:border-data-cyan group-hover:bg-data-cyan/15'
                : 'border-studio-accent/50 bg-studio-base/40 text-white group-hover:border-studio-accent group-hover:bg-studio-accent/15',
            ].join(' ')}
          >
            {data.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
});

export default Panel;
