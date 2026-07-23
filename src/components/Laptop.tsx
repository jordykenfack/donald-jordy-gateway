import type { ReactNode } from 'react';

// MacBook showcase — same frame asset and screen geometry as the AI portfolio
// hero. Children are clipped to the screen opening.
export default function Laptop({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`macbook-showcase ${className}`.trim()}>
      <div className="macbook-screen">{children}</div>
      <img src="/assets/macbook-frame.png" alt="" aria-hidden="true" className="macbook-frame" />
    </div>
  );
}
