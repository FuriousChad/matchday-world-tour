# Matchday World Tour — Task List

Last updated: 2026-04-07

---

## In Progress

_Nothing currently in progress._

---

## Up Next

### Core User Journey
- [ ] Show matches on city pages — fixtures list per city (date, teams, stage, stadium)
- [ ] Show matches on team pages — all group stage + knockout matches for selected team
- [ ] Save to My Trip buttons — wire favorites on city, place, and match cards (localStorage for guests, Supabase for signed-in users)
- [ ] My Trip / Saved page — build out `/saved` to display a user's saved cities, places, and matches

### Content
- [ ] Houston hero image — find and add a replacement skyline photo (current file is broken)
- [x] Travel tips — populated `travel_tips` field per city (transport, neighbourhoods, practical advice)
- [ ] Blog — build out `/blog` layout and publish first posts via Directus

### UX / Polish
- [ ] Homepage improvements — team picker flow, featured cities section, upcoming matches widget
- [ ] Fix GitHub auto-deploy — currently requires manual `vercel deploy --prod` after every push
- [ ] SEO — meta titles, descriptions, and Open Graph images for city and team pages

### Growth
- [ ] Affiliate links — wire Booking.com / OpenTable / Viator URLs into place cards

---

## Completed

- [x] Project scaffold — Next.js 16, TypeScript, Tailwind CSS v4, ShadCN UI
- [x] Supabase schema — teams, cities, stadiums, matches, places, itineraries, posts, favorites
- [x] Seed data — 60+ teams with flags, 11 cities, 11 stadiums
- [x] Google OAuth — client-side sign-in via Supabase, PKCE mismatch resolved
- [x] Team selector — guest-first with localStorage, syncs to Supabase on sign-in
- [x] City pages — `/cities/[slug]` route scaffolded
- [x] Directus CMS — deployed on Railway, connected to Supabase via Session Pooler
- [x] Vercel deployment — live at matchdayworldtour.com
- [x] Google AdSense — verification complete, ads.txt in place
- [x] Football-data.org integration — `src/lib/football-data.ts` with full MATCH_CITY_MAP
- [x] Match sync endpoint — `/api/sync/matches` protected by SYNC_SECRET, upserts 104 matches
- [x] Vercel cron — daily sync at 06:00 UTC
- [x] Places seed data — 76 places across all 11 cities (`004_seed_places.sql`)
- [x] Database schema documented — `docs/DATABASE_SCHEMA.md`
