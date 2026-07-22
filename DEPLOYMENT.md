# Deployment — Donald Jordy portfolio ecosystem

Three independent repos → three Vercel projects → one GoDaddy domain
(`donaldjordy.com`).

| Local folder | Suggested repo | Framework | Build | Output | Domain |
| --- | --- | --- | --- | --- | --- |
| `donald-jordy-gateway` | `donald-jordy-gateway` | Vite 5 + React 18 | `npm run build` | `dist` | **donaldjordy.com** (+ www → redirect) |
| `jack-portfolio` | `donald-jordy-ai-portfolio` | Vite 5 + React 18 | `npm run build` | `dist` | **ai.donaldjordy.com** |
| `jordy-portfolio` | `donald-jordy-data-portfolio` | Next.js 16 + React 19 | `npm run build` | `.next` (managed) | **data.donaldjordy.com** |

- Package manager: **npm** (all three). Node: **20.x** recommended.
- Vercel auto-detects each framework — **no `vercel.json` needed.**
- Install command: `npm install`. Dev ports: gateway 5175, AI 5173, data 3000.

## Environment variables

**None are required in production** — production URLs are baked in as defaults.
The env vars below are optional overrides (mainly for local dev / preview
deployments that should point at each other):

- Gateway (Vite): `VITE_GATEWAY_URL`, `VITE_AI_PORTFOLIO_URL`, `VITE_DATA_PORTFOLIO_URL`
- AI (Vite): `VITE_GATEWAY_URL`, `VITE_DATA_PORTFOLIO_URL`
- Data (Next): `NEXT_PUBLIC_GATEWAY_URL`, `NEXT_PUBLIC_AI_PORTFOLIO_URL`

Do **not** set these in production unless you intentionally want non-default
destinations.

## Push to GitHub (owner must be confirmed first)

`gh` is currently authenticated as **farelinfo**. Confirm this is the intended
owner, then for each repo:

```bash
# gateway
cd "donald-jordy-gateway"
gh repo create donald-jordy-gateway --public --source=. --remote=origin --push

# AI portfolio
cd "../jack-portfolio"
gh repo create donald-jordy-ai-portfolio --public --source=. --remote=origin --push

# data portfolio
cd "../jordy-portfolio"
gh repo create donald-jordy-data-portfolio --public --source=. --remote=origin --push
```

(Or add remotes manually and `git push -u origin main`.)

## Vercel import settings (per project)

- **Framework preset:** Vite (gateway, AI) / Next.js (data) — auto-detected
- **Build command:** `npm run build`
- **Output directory:** `dist` (gateway, AI) / *(default)* (data)
- **Install command:** `npm install`
- **Root directory:** repository root

Deploy all three first and verify them on their temporary `*.vercel.app` URLs
**before** touching DNS.

## Custom domains (Vercel → each project → Settings → Domains)

- Gateway project: add `donaldjordy.com` **and** `www.donaldjordy.com`
  (set `www` to **Redirect → donaldjordy.com**).
- AI project: add `ai.donaldjordy.com`.
- Data project: add `data.donaldjordy.com`.

## DNS in GoDaddy (copy the exact values Vercel shows)

After adding the domains in Vercel, Vercel displays the exact records. Typical
values:

| Type | Name | Value | For |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | donaldjordy.com (apex) |
| CNAME | `www` | `cname.vercel-dns.com` | www redirect |
| CNAME | `ai` | `cname.vercel-dns.com` | ai.donaldjordy.com |
| CNAME | `data` | `cname.vercel-dns.com` | data.donaldjordy.com |

- Remove GoDaddy's default parking/forwarding A + CNAME records that conflict.
- Use the **exact** apex A-record IP and CNAME target from Vercel (they can
  differ from the sample above).
- SSL certificates are issued automatically by Vercel once DNS resolves.
- **Do not change GoDaddy DNS until all three sites work on their Vercel URLs.**
