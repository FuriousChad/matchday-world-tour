# Matchday Passport — Product Spec

**Version:** 2.0
**Last Updated:** 2026-04-07
**Target Launch:** 2026-05-05
**World Cup Kickoff:** 2026-06-11

---

## Vision

Matchday Passport is a mobile-first web app for international football fans traveling to the United States for the 2026 FIFA World Cup.

The core user journey:
> "I support [Team] → where are they playing? → what do I do in that city?"

It is designed specifically for **first-time travelers to the United States** — people who need fast, trustworthy, curated information about a city they are visiting to follow their team. Every feature decision should be filtered through this lens.

---

## Target Users

- International football fans attending World Cup 2026 matches in the US
- Mobile-first usage (on the ground, in transit, day-of)
- First-time US visitors who need local guidance beyond just the match
- Primarily English-speaking for MVP (multilingual post-MVP)

---

## Business Model

- **Free to use** — no paywalls, no required account
- **Google AdSense** — banner placements throughout the app
- **Affiliate links** — contextually embedded in city and place content:
  - Hotels: Booking.com, Expedia
  - Restaurants: OpenTable
  - Experiences & Tours: Viator
  - Open to additional affiliate partners post-launch

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI

### Backend
- Supabase
  - PostgreSQL (relational data)
  - Auth (OAuth — Google + Apple only)
  - Storage (images)

### CMS
- Directus (connected directly to Supabase PostgreSQL)
- Used by the team and editors to manage all content dynamically
- No custom admin panel needed

### Data
- football-data.org API (free tier) for live World Cup match data
- Match data cached in Supabase and refreshed on a schedule to stay within rate limits

### Hosting
- Vercel

---

## Architecture Principles

- No hardcoded content — all data managed via Directus CMS
- Server Components with minimal client state
- Mobile-first responsive design
- Guest-first — all content browsable without an account
- localStorage for guest preferences (My Team, favorites), synced to Supabase on sign-in
- OAuth only — no email/password auth (reduces friction for travelers)

---

## Core Features — MVP

### 1. Home Page

- "My Team" selector — prominent, requires no login
- Next match banner for the user's selected team (shown if match is within 48 hours)
- City grid — all 11 US host cities
- Featured cities (editable via CMS)
- CTA: Explore Cities

---

### 2. My Team

The primary personalization feature of the app.

- User selects one of the 32 World Cup teams
- Saved to `localStorage` immediately (no login required)
- If user signs in via OAuth, synced to their Supabase account
- Shows the team's full match schedule across all cities
- Each match links to the relevant city page
- In-app banner or modal triggered when selected team has a match within 48 hours

---

### 3. City Pages

Dynamic, data-driven pages for each of the 11 US host cities.

Sections:
- **Overview** — city description, hero image
- **Stadium** — name, capacity, description, image
- **Matches** — all matches at this city's stadium (from sports API / Supabase)
- **Matchday Spots** — bars and fan zones with affiliate links where applicable
- **Food & Drink** — local restaurant recommendations with OpenTable affiliate links
- **Attractions** — landmarks and experiences with Viator affiliate links
- **Travel Tips** — curated local tips for first-time US visitors
- **Itinerary** — a 1-day matchday plan (read-only, CMS-managed)
- **Hotels** — affiliate links to Booking.com / Expedia for this city

Google Maps "Get Directions" deep links on all places (no Maps API key required for MVP).

AdSense placements within city page sections.

---

### 4. Match View

- Home team vs. away team (with flags)
- Match date and local time (displayed in the city's local timezone)
- Stage (Group Stage, Round of 16, etc.)
- Stadium name
- Link to city page
- "Add to Saved" action

---

### 5. Saved List ("My Trip")

- Users can save: cities, places, and matches
- Displayed as a consolidated "My Trip" saved list
- Guest users: saved in `localStorage`
- Signed-in users: saved to Supabase `favorites` table, synced across devices
- No forced login — saving works immediately for guests

---

### 6. Blog / Articles

- Simple article pages managed entirely in Directus CMS
- Initial content focus: US customs and etiquette for first-time visitors, tipping culture, transit guides, payment tips
- Discoverable from city pages and home page
- AdSense placements within articles

---

### 7. Auth (Optional)

- OAuth only — Google and Apple (via Supabase Auth)
- Triggered when a user wants to sync their data across devices
- No mandatory sign-up flow anywhere in the app
- On sign-in: `localStorage` data (My Team, favorites) merges into Supabase account
- Merge strategy: account data wins over local if conflict exists

---

## Database Schema

### teams
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| name | text | e.g. "Argentina" |
| slug | text UNIQUE | e.g. "argentina" |
| flag_url | text | |
| group | text | e.g. "Group A" |
| confederation | text | e.g. "CONMEBOL" |

---

### cities
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| name | text | e.g. "New York / New Jersey" |
| slug | text UNIQUE | e.g. "new-york-new-jersey" |
| state | text | |
| description | text | |
| hero_image_url | text | |
| travel_tips | text | markdown |
| featured | boolean | for home page featuring |
| created_at | timestamp | |

---

### stadiums
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| city_id | uuid FK → cities | |
| name | text | |
| capacity | int | |
| description | text | |
| image_url | text | |

---

### matches
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| city_id | uuid FK → cities | |
| stadium_id | uuid FK → stadiums | |
| home_team_id | uuid FK → teams | nullable (TBD matches) |
| away_team_id | uuid FK → teams | nullable (TBD matches) |
| match_date | timestamptz | stored in UTC |
| stage | text | "Group Stage", "Round of 16", etc. |
| api_match_id | text | external ID from sports API |
| created_at | timestamp | |

---

### places
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| city_id | uuid FK → cities | |
| name | text | |
| type | text | enum: bar / restaurant / attraction |
| description | text | |
| address | text | |
| maps_url | text | Google Maps deep link |
| image_url | text | |
| affiliate_url | text | OpenTable, Viator, etc. |
| tags | jsonb | e.g. ["fan zone", "rooftop", "sports bar"] |
| created_at | timestamp | |

---

### itineraries
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| city_id | uuid FK → cities | |
| title | text | e.g. "1-Day Matchday Guide" |
| duration | text | "1-day" |
| content | text | markdown |

---

### posts
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| title | text | |
| slug | text UNIQUE | |
| content | text | markdown |
| excerpt | text | |
| cover_image_url | text | |
| published | boolean | |
| published_at | timestamp | |
| created_at | timestamp | |

---

### favorites
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK → auth.users | |
| city_id | uuid FK → cities | nullable |
| place_id | uuid FK → places | nullable |
| match_id | uuid FK → matches | nullable |
| created_at | timestamp | |

---

## Relationships

```
teams ─────────────────── matches (home_team_id, away_team_id)
cities → stadiums         (1:N)
cities → matches          (1:N)
cities → places           (1:N)
cities → itineraries      (1:N)
auth.users → favorites    (1:N)
```

---

## Data Layer Strategy

- Supabase client used directly in Next.js Server Components
- No custom API routes needed for reads
- Match data fetched from football-data.org and cached in the `matches` table
- Cache refresh handled via a scheduled Vercel cron job
- RLS policies:
  - All tables except `favorites`: public read
  - `favorites`: authenticated users can only read/write their own rows

---

## US Host Cities (MVP — All 11)

| City | Stadium |
|---|---|
| New York / New Jersey | MetLife Stadium |
| Los Angeles | SoFi Stadium |
| Dallas | AT&T Stadium |
| San Francisco / Bay Area | Levi's Stadium |
| Seattle | Lumen Field |
| Boston | Gillette Stadium |
| Philadelphia | Lincoln Financial Field |
| Miami | Hard Rock Stadium |
| Atlanta | Mercedes-Benz Stadium |
| Kansas City | Arrowhead Stadium |
| Houston | NRG Stadium |

---

## Content Plan (MVP — Lean per City)

Per city:
- 1 stadium
- 3–5 matches (sourced from sports API)
- 5 places: 2 bars, 2 restaurants, 1 attraction
- 1 itinerary (1-day matchday plan)
- Travel tips section

All content managed in Directus. Editors can be onboarded to Directus to accelerate content creation.

---

## Post-MVP Roadmap

| Priority | Feature |
|---|---|
| High | Spanish language support (largest non-English fan base) |
| High | Canada + Mexico host cities (6 additional venues) |
| High | Push / email match reminders |
| Medium | Embedded Google Maps (replace deep links) |
| Medium | PWA — installable on home screen |
| Medium | 3-day itineraries per city |
| Low | User reviews on places |
| Low | Full multilingual (French, Portuguese, Arabic, German) |
| Low | Trip planner / itinerary builder |

---

## Risks

| Risk | Mitigation |
|---|---|
| Content volume — 11 cities is significant for a solo build | Onboard editors to Directus in Week 1 |
| Google AdSense approval takes 2–4 weeks | Apply for AdSense account before writing any code |
| Sports API rate limits on free tier | Cache all match data in Supabase; refresh via cron |
| Directus + Supabase setup complexity | Budget 2–3 days infra before touching Next.js |
| localStorage → Supabase sync edge cases | Define merge strategy upfront: account wins over local |

---

## 4-Week Build Plan

### Week 1 — Infrastructure
- Supabase project + schema creation
- Directus setup connected to Supabase PostgreSQL
- football-data.org API integration + match cache
- Seed 2–3 cities with full content
- Apply for Google AdSense

### Week 2 — Core Read Experience
- Home page (city grid, My Team selector, match banner)
- City pages (all sections)
- Match view
- Teams table + data

### Week 3 — Personalization & Auth
- My Team feature (localStorage + account sync)
- Saved List / My Trip (localStorage + Supabase favorites)
- OAuth auth (Google + Apple via Supabase)
- In-app match reminder banner/modal

### Week 4 — Monetization, Polish & Launch
- AdSense placements
- Affiliate links throughout city pages
- Blog / articles section
- Mobile QA + performance pass
- Vercel production deploy
