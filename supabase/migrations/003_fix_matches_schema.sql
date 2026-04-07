-- Allow city_id and stadium_id to be null (for non-US hosted matches)
ALTER TABLE matches
  ALTER COLUMN city_id   DROP NOT NULL,
  ALTER COLUMN stadium_id DROP NOT NULL;

-- Add unique constraint so upsert on api_match_id works
ALTER TABLE matches
  ADD CONSTRAINT matches_api_match_id_key UNIQUE (api_match_id);
