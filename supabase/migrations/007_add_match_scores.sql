-- Add score and status fields to matches table
-- status mirrors football-data.org values: SCHEDULED, TIMED, IN_PLAY, PAUSED, FINISHED, POSTPONED, SUSPENDED, CANCELLED
ALTER TABLE matches
  ADD COLUMN IF NOT EXISTS home_score  integer,
  ADD COLUMN IF NOT EXISTS away_score  integer,
  ADD COLUMN IF NOT EXISTS status      text NOT NULL DEFAULT 'SCHEDULED';
