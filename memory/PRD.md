# SV Developers — PRD

## Original Problem Statement
Build a complete, production-quality website for SV DEVELOPERS, a Hyderabad-based real estate development, promotion, marketing and sales company. Premium/futuristic navy-and-gold identity derived from the official logo, 10 pages (Home, About, All Projects, 5 Project Details, Team, Why Choose Us, Buyer-First, Contact, Privacy Policy, Disclaimer), filterable project grid, process timeline, FAQ accordion, contact form with backend persistence and WhatsApp integration. Strict content integrity: no invented prices, dates, approvals, or stats; company is new, 55 years = combined core-team experience only.

## Architecture
- Frontend: React 19 (CRA + craco), Tailwind 3.4, react-router-dom v7, framer-motion, lucide-react. Brand tokens in tailwind.config.js; design-system classes in index.css (btn-gold, btn-navy, eyebrow, navy-panel, field-input…).
- Data layer: src/data/{site,projects,team,faqs,home}.js — centralized, editable project facts with transparency notes.
- Backend: FastAPI (server.py) — POST/GET /api/enquiries persisted to MongoDB via BaseDocument/PyObjectId pattern; GET /api health.
- Components: layout (Header w/ compact sticky + mobile drawer, Footer), common (PageHero, SectionHeading, Reveal, PageMeta, StatusChip), ProjectCard, TeamCard, FaqAccordion, ContactForm, home sections.

## User Personas
- Home-buyer (plots/villas around Hyderabad) exploring opportunities transparently.
- Investor evaluating growth-corridor land with documentation awareness.
- NRI/out-of-town buyer using WhatsApp/phone for remote enquiries.

## Core Requirements (static)
10 routes as specified, exact brand palette (#062858/#07182F/#F5AA00/#C6A56A/…), Space Grotesk + Inter, hero/trust-strip/about/discovery/why/process/buyer-first/team/FAQ/CTA homepage sections, working filters, honest status labels, editable spec tables, no published prices/approval badges.

## Implemented (2026-10-12)
- All 10 pages + 404, all routes direct-navigable; Header (gold active indicator, compact-on-scroll, escape-closing drawer with scroll lock), shared Footer.
- Homepage sections A–J complete; filters animate (layout + AnimatePresence).
- Contact form → MongoDB (verified end-to-end) + WhatsApp deep links site-wide (per-project prefilled messages).
- SEO: per-page title/meta via PageMeta; favicon; og tags.
- Backend /api/enquiries live-verified (POST 201 + GET).
- Verified: desktop 1440 + mobile 390 screenshots (no overflow), mobile drawer escape, form submit success, project detail page.

## Implemented (2026-10-12, round 2)
- Official uploaded logo live site-wide (public/sv-logo.jpg, whitespace-trimmed; LOGO_URL in data/site.js). Footer shows it on a white card on midnight navy.
- Admin panel at /admin (noindex): JWT httpOnly-cookie login (bcrypt hash seeded from ADMIN_PASSWORD, 5-attempt/15-min brute-force lockout), Enquiries Inbox with New/Replied status, reply saved to Mongo + "Send via WhatsApp" deep link to the enquirer's number.
- AI chatbot site-wide (hidden on /admin): floating gold launcher, streaming SSE via /api/chat (emergentintegrations, OpenAI gpt-5.4, EMERGENT_LLM_KEY), MongoDB-persisted history, strict system prompt using only verified project facts.
- Verified: admin login → inbox → reply (status flips to Replied), chat streaming on desktop + mobile, official logo on desktop + mobile header, no overflow, no console errors.

## Implemented (2026-10-12, round 3)
- Shankarpally Villa Plots published as HMDA & RERA approved (as confirmed by the company): status chip on cards + detail page, approvals spec row, highlights, transparency note reworded, FAQ updated, chatbot states it (verified via live chat stream).
- Motion pass: hero parallax (bg drift + content fade + animated gold underline/rule), page-enter transitions, count-up "55" stat, buyer-first band parallax, gold button shine sweep, back-to-top button, directional reveal support. Mobile overflow fixed (slide-in offset) — verified 390px clean.

## Handoff
- GitHub: entire codebase pushed to https://github.com/swifttruste-sudo/sv-developers (branch main, HEAD 5c30297). Secrets excluded via .gitignore (backend/.env, frontend/.env never committed); .env.example templates included for local setup.

## Implemented (2026-10-12, round 4)
- More imagery: curtain-reveal galleries on all 5 project detail pages (2-4 images each), 3-image collage on About, parallax image bands on Team / Why Choose Us / Buyer-First, interior visual on Contact — all labelled "representative visuals, not actual site photographs".
- More animation: ImageReveal (clip-path curtain + scale, IO-safe variant pattern), GalleryGrid staggered rhythm, parallax ImageBand component, team monogram hover tilt.
- Fixed: ImageReveal deadlock (own clip-path zeroed the IntersectionObserver area — moved clip to child variant under an unclipped observed wrapper).
- Pushed to GitHub main (7f8eb82).

## Implemented (2026-10-12, round 5)
- Full responsive audit passed at 390 / 768 / 1440 / 1920 px: zero horizontal overflow everywhere, tablet drawer verified (opens, escape-closes), grids collapse correctly.
- Refinements: project-detail hero image taller on mobile (16/10 → 21/9 on sm+), hero call FAB hidden on small screens (drawer/chat/footer carry contact).
- Pushed to GitHub main (0e397fe).

## Implemented (2026-10-12, round 6)
- Exhaustive responsive sweep: all 14 routes + mobile drawer open + chat open + admin login at 360px, admin dashboard + reply flow at 390px — zero horizontal overflow in every state. Verified widths now: 360 / 390 / 768 / 1440 / 1920. No code changes required this round.

## Not Implemented / Placeholders (honest)
- Official logo: no upload received — crafted navy/gold lockup in use. Drop file in /public + set LOGO_URL in src/data/site.js to swap.
- Team photos: neutral monogram placeholders per brief.
- Project facts kept "to be confirmed" where company must reconfirm (prices, approvals, possession, Silpa RRR specs, BBG identity).
- Map, hours, email address not shown (none supplied — none invented).

## Backlog
- P1: Upload official logo + team photographs; reconfirm Shankarpally pricing & approvals → publish badges.
- P1: Admin panel to view/reply enquiries (data already in Mongo).
- P2: Add Shadnagar/Shabad project listings to data file when verified.
- P2: Brochure downloads per project; gallery lightboxes.
