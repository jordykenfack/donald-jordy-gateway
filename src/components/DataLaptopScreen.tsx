import { useEffect, useRef, useState } from 'react';

// Data-image photos swiping horizontally inside the laptop screen.
const IMAGES = ['/data/01.png', '/data/02.png', '/data/03.png', '/data/04.png', '/data/05.png'];

export default function DataLaptopScreen() {
  const [index, setIndex] = useState(0);
  const reduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (reduced.current) return;
    let timer: number;
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        if (!document.hidden) setIndex((v) => (v + 1) % IMAGES.length);
      }, 2800);
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
  }, []);

  return (
    <div className="absolute inset-0 bg-[#0c0c0d]">
      {IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          draggable={false}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: reduced.current ? undefined : `translateX(${(i - index) * 100}%)`,
            opacity: reduced.current && i !== 0 ? 0 : 1,
            transition: 'transform 0.7s cubic-bezier(0.65,0,0.35,1)',
          }}
        />
      ))}
    </div>
  );
}
