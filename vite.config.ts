import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The gateway runs alongside the two portfolios in local development:
//   - jack-portfolio  (AI Studio)      → Vite   on :5173
//   - jordy-portfolio (Data Science)   → Next   on :3000
// so the gateway takes its own dedicated port to avoid collisions.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    strictPort: false,
  },
});
