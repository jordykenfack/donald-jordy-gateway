import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Panel from './components/Panel';
import TopNav from './components/TopNav';
import { brand, destinationFor, portfolioPaths, type PortfolioKey } from './config/portfolios';

export default function App() {
  const dataRef = useRef<HTMLAnchorElement>(null);
  const aiRef = useRef<HTMLAnchorElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  // Gate: interactions run only where the desktop split + motion are allowed.
  const interactive = useRef(false);
  // Which panel's interface environment is "live" (drives internal animation).
  const [activeSide, setActiveSide] = useState<PortfolioKey | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      () => {
        interactive.current = true;
        gsap.set([dataRef.current, aiRef.current], { flexGrow: 1 });
        return () => {
          interactive.current = false;
        };
      },
    );

    return () => mm.revert();
  }, []);

  const emphasize = (key: PortfolioKey) => {
    if (!interactive.current) return;
    setActiveSide(key);
    const active = key === 'dataScience' ? dataRef.current : aiRef.current;
    const other = key === 'dataScience' ? aiRef.current : dataRef.current;
    // One tween per element with overwrite:'auto' so rapid pointer movement
    // cleanly retargets instead of stacking conflicting tweens.
    gsap.to(active, {
      flexGrow: 1.72,
      filter: 'brightness(1) saturate(1)',
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto',
    });
    gsap.to(other, {
      flexGrow: 1,
      filter: 'brightness(0.5) saturate(0.72)',
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto',
    });
    gsap.to(centerRef.current, {
      opacity: 0.12,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const reset = () => {
    if (!interactive.current) return;
    setActiveSide(null);
    gsap.to([dataRef.current, aiRef.current], {
      flexGrow: 1,
      filter: 'brightness(1) saturate(1)',
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    gsap.to(centerRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  return (
    <div className="relative flex min-h-svh flex-col bg-[#0a0a0b] md:h-svh md:overflow-hidden">
      <TopNav />

      {/* Mobile intro — the positioning statement is visible without hover. */}
      <div className="px-6 pb-8 pt-24 text-center md:hidden">
        <h1 className="font-display text-2xl font-semibold leading-tight tracking-tight text-white">
          {brand.primaryStatement}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
          {brand.supportingStatement}
        </p>
      </div>

      {/* Split world */}
      <div className="relative flex flex-1 flex-col md:flex-row">
        <Panel
          ref={dataRef}
          variant="dataScience"
          data={portfolioPaths.dataScience}
          href={destinationFor('dataScience')}
          index={0}
          active={activeSide === 'dataScience'}
          previewLabel="Sample Analysis Environment"
          onEnter={() => emphasize('dataScience')}
          onLeave={reset}
          onFocus={() => emphasize('dataScience')}
          onBlur={reset}
        />
        <Panel
          ref={aiRef}
          variant="aiStudio"
          data={portfolioPaths.aiStudio}
          href={destinationFor('aiStudio')}
          index={1}
          active={activeSide === 'aiStudio'}
          previewLabel="Interactive Capability Preview"
          onEnter={() => emphasize('aiStudio')}
          onLeave={reset}
          onFocus={() => emphasize('aiStudio')}
          onBlur={reset}
        />

        {/* Desktop center statement — pointer-events-none so both panels stay
            directly hoverable and clickable underneath it. */}
        <div
          ref={centerRef}
          className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center md:flex"
        >
          <div className="max-w-xl px-6 text-center">
            <span className="mb-4 inline-block h-px w-10 bg-white/40 align-middle" />
            <h1 className="font-display text-[clamp(1.6rem,2.5vw,2.5rem)] font-semibold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              {brand.primaryStatement}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70 [text-shadow:0_1px_16px_rgba(0,0,0,0.6)]">
              {brand.supportingStatement}
            </p>
          </div>
        </div>

        {/* Desktop footer statement — restrained, bottom-centered overlay. */}
        <p className="pointer-events-none absolute inset-x-0 bottom-5 z-20 hidden text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/45 md:block">
          {brand.footerStatement}
        </p>
      </div>

      {/* Mobile footer statement */}
      <footer className="px-6 py-8 text-center md:hidden">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
          {brand.footerStatement}
        </p>
      </footer>
    </div>
  );
}
