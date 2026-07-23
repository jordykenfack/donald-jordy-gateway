// ---------------------------------------------------------------------------
// Centralized portfolio configuration — the ONE place that defines where each
// panel points.
//
// Production destinations are fixed subdomains of donaldjordy.com. For local
// development, override them via Vite env vars in a `.env.local` file (see
// `.env.example`) without touching this file:
//
//   VITE_AI_PORTFOLIO_URL=http://localhost:5173
//   VITE_DATA_PORTFOLIO_URL=http://localhost:3000
//   VITE_GATEWAY_URL=http://localhost:5175
//
// No absolute filesystem paths are stored here — nothing local is ever shipped
// to the browser.
// ---------------------------------------------------------------------------

export type PortfolioKey = 'dataScience' | 'aiStudio';

export interface PortfolioPath {
  /** small eyebrow / category label */
  label: string;
  /** main title shown on the panel */
  title: string;
  /** three short capability tags */
  tags: string[];
  /** concise two-line description */
  description: string;
  /** CTA text */
  cta: string;
  /** resolved public destination for the current environment */
  url: string;
}

const env = import.meta.env;

// Production defaults; env vars win when provided (local dev / previews).
export const urls = {
  gateway: env.VITE_GATEWAY_URL ?? 'https://donaldjordy.com',
  ai: env.VITE_AI_PORTFOLIO_URL ?? 'https://ai.donaldjordy.com',
  data: env.VITE_DATA_PORTFOLIO_URL ?? 'https://data.donaldjordy.com',
};

export const portfolioPaths: Record<PortfolioKey, PortfolioPath> = {
  dataScience: {
    label: 'Professional Career',
    title: 'Data Scientist',
    tags: ['Python', 'SQL', 'Machine Learning'],
    description:
      'Transforming complex data into reliable insights, predictive models, and better decisions.',
    cta: 'Explore Data Science',
    url: urls.data,
  },
  aiStudio: {
    label: 'Freelance & Consulting',
    title: 'AI Solutions Builder',
    tags: ['AI Websites', 'Digital Hubs', 'Automation'],
    description:
      'Building conversion-focused websites and connected AI systems for modern businesses.',
    cta: 'Explore AI Studio',
    url: urls.ai,
  },
};

/** The public destination for a panel. */
export function destinationFor(key: PortfolioKey): string {
  return portfolioPaths[key].url;
}

// Shared brand / navigation — kept here so the gateway and both portfolio
// switchers can stay in sync from a single source.
export const brand = {
  name: 'DONALD JORDY',
  primaryStatement: 'Two disciplines. One problem-solving mindset.',
  supportingStatement:
    'I work at the intersection of data, artificial intelligence, and digital systems. Choose the side of my work most relevant to you.',
  footerStatement: 'Data for decisions. AI systems for growth.',
  links: {
    about: '#about',
    linkedin: 'https://www.linkedin.com/in/donaldjordy',
    contact: 'mailto:jordykenfack@gmail.com',
  },
};
