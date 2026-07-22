import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Panel from './components/Panel';
import TopNav from './components/TopNav';
import { brand, destinationFor, portfolioPaths, type PortfolioKey } from './config/portfolios';

const GREEN = '#1a7f57';

export default function App() {
  const dataRef = useRef<HTMLAnchorElement>(null);
  const aiRef = useRef<HTMLAnchorElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  // Gate: panel-expansion runs only on the desktop split with motion allowed.
  const interactive = useRef(false);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      interactive.current = true;
      gsap.set([dataRef.current, aiRef.current], { flexGrow: 1 });
      return () => {
        interactive.current = false;
      };
    });
    return () => mm.revert();
  }, []);

  const emphasize = (key: PortfolioKey) => {
    if (!interactive.current) return;
    const active = key === 'dataScience' ? dataRef.current : aiRef.current;
    const other = key === 'dataScience' ? aiRef.current : dataRef.current;
    // One tween per element with overwrite:'auto' so rapid pointer movement
    // retargets cleanly instead of stacking conflicting tweens.
    gsap.to(active, { flexGrow: 1.7, duration: 0.7, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(other, { flexGrow: 1, duration: 0.7, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(centerRef.current, { scale: 0.94, opacity: 0.55, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
  };

  const reset = () => {
    if (!interactive.current) return;
    gsap.to([dataRef.current, aiRef.current], { flexGrow: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(centerRef.current, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
  };

  return (
    <div className="relative flex min-h-svh flex-col bg-[#0c0c0d] md:h-svh md:overflow-hidden">
      <TopNav />

      {/* Mobile intro — statement inside the green circle. */}
      <div className="flex justify-center bg-[#0c0c0d] px-6 pb-8 pt-24 md:hidden">
        <div
          className="flex aspect-square w-[248px] flex-col items-center justify-center rounded-full px-9 text-center text-white shadow-[0_18px_50px_-12px_rgba(0,0,0,0.5)]"
          style={{ backgroundColor: GREEN }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/70">{brand.name}</span>
          <p className="mt-2.5 font-display text-[15px] font-semibold leading-[1.15]">{brand.primaryStatement}</p>
        </div>
      </div>

      {/* Split world */}
      <div className="relative flex flex-1 flex-col md:flex-row">
        <Panel
          ref={dataRef}
          variant="dataScience"
          data={portfolioPaths.dataScience}
          href={destinationFor('dataScience')}
          index={0}
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
          onEnter={() => emphasize('aiStudio')}
          onLeave={reset}
          onFocus={() => emphasize('aiStudio')}
          onBlur={reset}
        />

        {/* Desktop centre — green circle over the seam. pointer-events-none so
            both panels stay directly hoverable/clickable underneath. */}
        <div
          ref={centerRef}
          className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center md:flex"
        >
          <div
            className="flex aspect-square w-[clamp(230px,23vw,318px)] -translate-y-10 flex-col items-center justify-center rounded-full px-10 text-center text-white shadow-[0_24px_70px_-18px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
            style={{ backgroundColor: GREEN }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/70">{brand.name}</span>
            <h1 className="mt-3 font-display text-[clamp(1.15rem,1.7vw,1.55rem)] font-semibold leading-[1.12]">
              {brand.primaryStatement}
            </h1>
          </div>
        </div>

        {/* Desktop footer statement */}
        <p
          className="pointer-events-none absolute inset-x-0 bottom-5 z-20 hidden text-center font-mono text-[11px] font-medium uppercase tracking-[0.3em] md:block"
          style={{ color: GREEN }}
        >
          {brand.footerStatement}
        </p>
      </div>

      {/* Mobile footer statement */}
      <footer className="bg-[#0c0c0d] px-6 py-8 text-center md:hidden">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: GREEN }}>
          {brand.footerStatement}
        </p>
      </footer>
    </div>
  );
}
