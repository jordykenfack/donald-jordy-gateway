import { forwardRef } from 'react';
import type { PortfolioKey, PortfolioPath } from '../config/portfolios';

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
// Data, dark for AI); the copy sits in a bordered "square grid" module.
const Panel = forwardRef<HTMLAnchorElement, PanelProps>(function Panel(
  { variant, data, href, index, onEnter, onLeave, onFocus, onBlur },
  ref,
) {
  const isData = variant === 'dataScience';
  const border = isData ? 'border-[#1a1a18]/15' : 'border-white/15';
  const subText = isData ? 'text-[#1a1a18]/65' : 'text-white/65';

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
        'panel group relative flex min-h-0 flex-1 flex-col justify-end overflow-hidden no-underline outline-none',
        'transition-[box-shadow] duration-300 focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a7f57]',
        isData ? 'bg-[#f2eee3] text-[#1a1a18]' : 'bg-[#0c0c0d] text-[#f5f4f1]',
        'min-h-[58svh] md:min-h-0',
      ].join(' ')}
    >
      <div className="relative z-10 p-6 md:p-10 lg:p-14">
        <div className={`grid w-full max-w-[440px] overflow-hidden rounded-[5px] border ${border}`}>
          {/* eyebrow row */}
          <div className={`flex items-center gap-2 border-b ${border} px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.26em]`}>
            <span className="text-[#1a7f57]">0{index + 1}</span>
            <span className="opacity-25">/</span>
            <span>{data.label}</span>
          </div>

          {/* title row */}
          <div className={`border-b ${border} px-4 py-5`}>
            <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.9rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
              {data.title}
            </h2>
          </div>

          {/* description | CTA — two grid cells */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className={`border-b ${border} px-4 py-4 sm:border-b-0 sm:border-r`}>
              <p className={`text-[13px] leading-relaxed ${subText}`}>{data.description}</p>
            </div>
            <div className="flex items-center justify-center px-4 py-5">
              <span className="panel-cta inline-flex items-center gap-2 rounded-full border border-[#1a7f57] px-4 py-2 text-[13px] font-medium text-[#1a7f57] transition-colors duration-300 group-hover:bg-[#1a7f57] group-hover:text-white">
                {data.cta}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
});

export default Panel;
