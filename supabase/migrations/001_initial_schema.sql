-- ============================================================
-- Matchday Passport — Initial Schema
-- Run this in the Supabase SQL Editor (dashboard → SQL Editor)
-- ============================================================

-- ─── Teams ───────────────────────────────────────────────────
CREATE TABLE teams (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  slug            text NOT NULL UNIQUE,
  flag_url        text,
  "group"         text,
  confederation   text
);

-- ─── Cities ──────────────────────────────────────────────────
CREATE TABLE cities (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  slug            text NOT NULL UNIQUE,
  state           text,
  description     text,
  hero_image_url  text,
  travel_tips     text,
  featured        boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── Stadiums ────────────────────────────────────────────────
CREATE TABLE stadiums (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id         uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  name            text NOT NULL,
  capacity        int,
  description     text,
  image_url       text
);

-- ─── Matches ─────────────────────────────────────────────────
CREATE TABLE matches (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id         uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  stadium_id      uuid NOT NULL REFERENCES stadiums(id) ON DELETE CASCADE,
  home_team_id    uuid REFERENCES teams(id) ON DELETE SET NULL,
  away_team_id    uuid REFERENCES teams(id) ON DELETE SET NULL,
  match_date      timestamptz NOT NULL,
  stage           text NOT NULL,
  api_match_id    text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── Places ──────────────────────────────────────────────────
CREATE TABLE places (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id         uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  name            text NOT NULL,
  type            text NOT NULL CHECK (type IN ('bar', 'restaurant', 'attraction')),
  description     text,
  address         text,
  maps_url        text,
  image_url       text,
  affiliate_url   text,
  tags            jsonb,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── Itineraries ─────────────────────────────────────────────
CREATE TABLE itineraries (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id         uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  title           text NOT NULL,
  duration        text NOT NULL,
  content         text NOT NULL
);

-- ─── Posts (Blog) ────────────────────────────────────────────
CREATE TABLE posts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text NOT NULL,
  slug            text NOT NULL UNIQUE,
  content         text NOT NULL,
  excerpt         text,
  cover_image_url text,
  published       boolean NOT NULL DEFAULT false,
  published_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── Favorites ───────────────────────────────────────────────
CREATE TABLE favorites (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  city_id         uuid REFERENCES cities(id) ON DELETE CASCADE,
  place_id        uuid REFERENCES places(id) ON DELETE CASCADE,
  match_id        uuid REFERENCES matches(id) ON DELETE CASCADE,
  created_at      timestamptz NOT NULL DEFAULT now(),
  -- ensure at least one target is set
  CONSTRAINT favorites_has_target CHECK (
    (city_id IS NOT NULL)::int +
    (place_id IS NOT NULL)::int +
    (match_id IS NOT NULL)::int = 1
  )
);

-- ─── Indexes ─────────────────────────────────────────────────
CREATE INDEX idx_matches_city_id       ON matches(city_id);
CREATE INDEX idx_matches_home_team_id  ON matches(home_team_id);
CREATE INDEX idx_matches_away_team_id  ON matches(away_team_id);
CREATE INDEX idx_matches_match_date    ON matches(match_date);
CREATE INDEX idx_places_city_id        ON places(city_id);
CREATE INDEX idx_places_type           ON places(type);
CREATE INDEX idx_favorites_user_id     ON favorites(user_id);
CREATE INDEX idx_posts_slug            ON posts(slug);

-- ─── Row Level Security ──────────────────────────────────────
ALTER TABLE teams        ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities       ENABLE ROW LEVEL SECURITY;
ALTER TABLE stadiums     ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches      ENABLE ROW LEVEL SECURITY;
ALTER TABLE places       ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries  ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites    ENABLE ROW LEVEL SECURITY;

-- Public read on all content tables
CREATE POLICY "Public read" ON teams        FOR SELECT USING (true);
CREATE POLICY "Public read" ON cities       FOR SELECT USING (true);
CREATE POLICY "Public read" ON stadiums     FOR SELECT USING (true);
CREATE POLICY "Public read" ON matches      FOR SELECT USING (true);
CREATE POLICY "Public read" ON places       FOR SELECT USING (true);
CREATE POLICY "Public read" ON itineraries  FOR SELECT USING (true);
CREATE POLICY "Public read" ON posts        FOR SELECT USING (published = true);

-- Favorites: users can only access their own rows
CREATE POLICY "Own favorites select" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Own favorites insert" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Own favorites delete" ON favorites
  FOR DELETE USING (auth.uid() = user_id);
