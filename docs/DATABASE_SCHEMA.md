# Database Schema — Matchday World Tour

## App Tables (Supabase — public schema)

---

### `teams`

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| name | text | |
| slug | text UNIQUE | |
| flag_url | text | flagcdn.com URL |
| group | text | e.g. "A", "B" |
| confederation | text | e.g. "UEFA" |

---

### `cities`

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| name | text | |
| slug | text UNIQUE | e.g. "new-york-new-jersey" |
| state | text | |
| description | text | |
| hero_image_url | text | |
| travel_tips | text | |
| featured | boolean | default false |
| created_at | timestamptz | |

---

### `stadiums`

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| city_id | uuid FK → cities | CASCADE delete |
| name | text | |
| capacity | int | |
| description | text | |
| image_url | text | |

---

### `matches`

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| city_id | uuid FK → cities | nullable (non-US matches) |
| stadium_id | uuid FK → stadiums | nullable (non-US matches) |
| home_team_id | uuid FK → teams | SET NULL on delete |
| away_team_id | uuid FK → teams | SET NULL on delete |
| match_date | timestamptz | |
| stage | text | e.g. "Group Stage", "Final" |
| api_match_id | text UNIQUE | football-data.org match ID |
| created_at | timestamptz | |

---

### `places`

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| city_id | uuid FK → cities | CASCADE delete |
| name | text | |
| type | text | CHECK: bar / restaurant / attraction |
| description | text | |
| address | text | |
| maps_url | text | Google Maps link |
| image_url | text | |
| affiliate_url | text | Booking.com / OpenTable etc. |
| tags | jsonb | |
| created_at | timestamptz | |

---

### `itineraries`

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| city_id | uuid FK → cities | CASCADE delete |
| title | text | |
| duration | text | e.g. "3 days" |
| content | text | markdown |

---

### `posts`

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| title | text | |
| slug | text UNIQUE | |
| content | text | markdown |
| excerpt | text | |
| cover_image_url | text | |
| published | boolean | default false |
| published_at | timestamptz | |
| created_at | timestamptz | |

---

### `favorites`

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| user_id | uuid FK → auth.users | CASCADE delete |
| city_id | uuid FK → cities | nullable |
| place_id | uuid FK → places | nullable |
| match_id | uuid FK → matches | nullable |
| created_at | timestamptz | |
| — | CHECK constraint | exactly one of city_id / place_id / match_id must be set |

---

## Row Level Security

| Table | Policy |
|---|---|
| teams | Public read |
| cities | Public read |
| stadiums | Public read |
| matches | Public read |
| places | Public read |
| itineraries | Public read |
| posts | Public read where published = true |
| favorites | Select / insert / delete own rows only (auth.uid() = user_id) |

---

## Directus System Tables (auto-created, same Supabase DB)

Directus creates these in the `public` schema on first boot. They are managed entirely by Directus and should not be modified manually.

| Table | Purpose |
|---|---|
| directus_users | CMS admin accounts |
| directus_roles | Permission roles |
| directus_permissions | Role-level CRUD rules |
| directus_collections | Registered collections (app tables) |
| directus_fields | Field metadata and display config |
| directus_relations | Relationship definitions |
| directus_files | Uploaded file records (S3/local) |
| directus_folders | File folder structure |
| directus_settings | Global CMS settings |
| directus_activity | Audit log of all changes |
| directus_revisions | Content version history |
| directus_sessions | Admin login sessions |
| directus_presets | Saved collection view filters |
| directus_webhooks | Outbound webhook config |
| directus_flows | Automation flows |
| directus_operations | Flow operation steps |
| directus_notifications | In-app notifications |
| directus_shares | Public share links |
| directus_translations | String translations |

---

## Migrations

| File | Description |
|---|---|
| 001_initial_schema.sql | All app tables, indexes, RLS policies |
| 002_seed_data.sql | 60+ teams, 11 cities, 11 stadiums |
| 003_fix_matches_schema.sql | Make city_id / stadium_id nullable; add UNIQUE on api_match_id |
