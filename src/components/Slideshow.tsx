import { useEffect, useRef, useState } from 'react';

// Full-cover image slideshow used as a panel background. Slides move
// horizontally (the active slide sits at 0, earlier slides are pushed left,
// later slides wait to the right) with a gentle cross-fade. It advances a
// little faster while its panel is active, pauses when the tab is hidden, and
// — under prefers-reduced-motion — shows a single static image with no motion.
export default function Slideshow({
  images,
  active,
  interval = 4200,
  activeInterval = 2600,
}: {
  images: string[];
  active: boolean;
  interval?: number;
  activeInterval?: number;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (reduced.current || images.length <= 1) return;
    let timer: number | undefined;
    const tick = () => {
      if (!document.hidden) setIndex((i) => (i + 1) % images.length);
    };
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(tick, active ? activeInterval : interval);
    };
    start();
    const onVisibility = () => {
      if (document.hidden) window.clearInterval(timer);
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [images.length, active, interval, activeInterval]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {images.map((src, i) => {
        const offset = (i - index) * 100;
        return (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              transform: reduced.current ? undefined : `translateX(${offset}%)`,
              opacity: i === index ? 1 : 0,
              transition: reduced.current
                ? 'opacity 0.6s ease'
                : 'transform 0.9s cubic-bezier(0.65,0,0.35,1), opacity 0.9s ease',
              willChange: 'transform, opacity',
            }}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        );
      })}
    </div>
  );
}
