import { forwardRef } from 'react';
import type { PortfolioKey, PortfolioPath } from '../config/portfolios';
import Laptop from './Laptop';
import DataLaptopScreen from './DataLaptopScreen';
import AILaptopScreen from './AILaptopScreen';

interface PanelProps {
  variant: PortfolioKey;
  data: PortfolioPath;
  href: string;
  index: number;
  onEnter: () => void;
  onLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

// Each panel is a single semantic anchor so the whole surface is clickable,
// keyboard-focusable and Enter-activatable. Flat solid background (cream for
// Data, dark for AI); a laptop showcase fills the upper area and a borderless
// editorial caption sits beneath it.
const Panel = forwardRef<HTMLAnchorElement, PanelProps>(function Panel(
  { variant, data, href, index, onEnter, onLeave, onFocus, onBlur },
  ref,
) {
  const isData = variant === 'dataScience';
  const line = isData ? 'bg-[#1a1a18]/15' : 'bg-white/60';
  const eyebrow = isData ? 'text-[#1a1a18]/55' : 'text-white/50';
  const desc = isData ? 'text-[#1a1a18]/70' : 'text-white/65';
  const tag = isData
    ? 'border-[#1a7f57]/35 bg-[#1a7f57]/[0.08] text-[#1a1a18]'
    : 'border-[#1a7f57]/45 bg-[#1a7f57]/[0.14] text-white/90';

  return (
    <a
      ref={ref}
      href={href}
      data-panel={variant}
      aria-label={`${data.title} — ${data.cta}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={[
        'panel group relative flex min-h-0 flex-1 flex-col overflow-hidden no-underline outline-none',
        'transition-[box-shadow] duration-300 focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a7f57]',
        isData ? 'bg-[#f2eee3] text-[#1a1a18]' : 'bg-[#0c0c0d] text-[#f5f4f1]',
      ].join(' ')}
    >
      {/* laptop showcase — fills the upper area */}
      <div className="flex flex-1 items-center justify-center px-6 pb-4 pt-20 md:pt-28">
        <div className="w-[min(82%,430px)]">
          <Laptop>{isData ? <DataLaptopScreen /> : <AILaptopScreen />}</Laptop>
        </div>
      </div>

      {/* editorial caption — borderless */}
      <div className="relative z-10 flex justify-center px-6 pb-9 md:px-10 md:pb-11 lg:px-14 lg:pb-14">
        <div className="w-full max-w-[430px]">
          <div className={`h-px w-full ${line}`} />

          <div className={`mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] ${eyebrow}`}>
            <span className="text-[#1a7f57]">0{index + 1}</span>
            <span className="mx-2 opacity-50">—</span>
            {data.label}
          </div>

          <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.25rem)] font-semibold leading-[1.03] tracking-[-0.02em] md:min-h-[2.06em]">
            {data.title}
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {data.tags.map((t) => (
              <span key={t} className={`rounded-md border px-2.5 py-1 text-[12px] font-medium ${tag}`}>
                {t}
              </span>
            ))}
          </div>

          <p className={`mt-5 max-w-[400px] text-[clamp(0.95rem,1.05vw,1.075rem)] font-normal leading-[1.55] ${desc}`}>
            {data.description}
          </p>

          <span className="panel-cta mt-6 inline-flex items-center gap-2 rounded-full border border-[#1a7f57] px-5 py-2.5 text-[15px] font-semibold text-[#1a7f57] transition-colors duration-300 group-hover:bg-[#1a7f57] group-hover:text-white">
            {data.cta}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
            >
              <path d="M4 10L10 4M10 4H5.2M10 4V8.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
});

export default Panel;
