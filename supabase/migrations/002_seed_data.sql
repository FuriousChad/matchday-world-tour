-- ============================================================
-- Matchday Passport — Seed Data
-- Run this in the Supabase SQL Editor after 001_initial_schema.sql
-- ============================================================

-- ─── Teams (FIFA 2026 — 48 teams) ────────────────────────────
-- Flag URLs use flagcdn.com (free, no API key needed)

INSERT INTO teams (name, slug, flag_url, confederation) VALUES

-- CONMEBOL (South America)
('Argentina',    'argentina',    'https://flagcdn.com/w40/ar.png', 'CONMEBOL'),
('Brazil',       'brazil',       'https://flagcdn.com/w40/br.png', 'CONMEBOL'),
('Colombia',     'colombia',     'https://flagcdn.com/w40/co.png', 'CONMEBOL'),
('Uruguay',      'uruguay',      'https://flagcdn.com/w40/uy.png', 'CONMEBOL'),
('Ecuador',      'ecuador',      'https://flagcdn.com/w40/ec.png', 'CONMEBOL'),
('Paraguay',     'paraguay',     'https://flagcdn.com/w40/py.png', 'CONMEBOL'),
('Venezuela',    'venezuela',    'https://flagcdn.com/w40/ve.png', 'CONMEBOL'),

-- UEFA (Europe)
('France',       'france',       'https://flagcdn.com/w40/fr.png', 'UEFA'),
('Spain',        'spain',        'https://flagcdn.com/w40/es.png', 'UEFA'),
('England',      'england',      'https://flagcdn.com/w40/gb-eng.png', 'UEFA'),
('Germany',      'germany',      'https://flagcdn.com/w40/de.png', 'UEFA'),
('Portugal',     'portugal',     'https://flagcdn.com/w40/pt.png', 'UEFA'),
('Netherlands',  'netherlands',  'https://flagcdn.com/w40/nl.png', 'UEFA'),
('Italy',        'italy',        'https://flagcdn.com/w40/it.png', 'UEFA'),
('Belgium',      'belgium',      'https://flagcdn.com/w40/be.png', 'UEFA'),
('Croatia',      'croatia',      'https://flagcdn.com/w40/hr.png', 'UEFA'),
('Switzerland',  'switzerland',  'https://flagcdn.com/w40/ch.png', 'UEFA'),
('Denmark',      'denmark',      'https://flagcdn.com/w40/dk.png', 'UEFA'),
('Austria',      'austria',      'https://flagcdn.com/w40/at.png', 'UEFA'),
('Turkey',       'turkey',       'https://flagcdn.com/w40/tr.png', 'UEFA'),
('Poland',       'poland',       'https://flagcdn.com/w40/pl.png', 'UEFA'),
('Scotland',     'scotland',     'https://flagcdn.com/w40/gb-sct.png', 'UEFA'),
('Serbia',       'serbia',       'https://flagcdn.com/w40/rs.png', 'UEFA'),
('Ukraine',      'ukraine',      'https://flagcdn.com/w40/ua.png', 'UEFA'),
('Hungary',      'hungary',      'https://flagcdn.com/w40/hu.png', 'UEFA'),
('Slovakia',     'slovakia',     'https://flagcdn.com/w40/sk.png', 'UEFA'),
('Slovenia',     'slovenia',     'https://flagcdn.com/w40/si.png', 'UEFA'),
('Romania',      'romania',      'https://flagcdn.com/w40/ro.png', 'UEFA'),
('Czech Republic', 'czech-republic', 'https://flagcdn.com/w40/cz.png', 'UEFA'),
('Greece',       'greece',       'https://flagcdn.com/w40/gr.png', 'UEFA'),

-- CONCACAF (North/Central America & Caribbean)
('United States', 'united-states', 'https://flagcdn.com/w40/us.png', 'CONCACAF'),
('Mexico',       'mexico',       'https://flagcdn.com/w40/mx.png', 'CONCACAF'),
('Canada',       'canada',       'https://flagcdn.com/w40/ca.png', 'CONCACAF'),
('Panama',       'panama',       'https://flagcdn.com/w40/pa.png', 'CONCACAF'),
('Costa Rica',   'costa-rica',   'https://flagcdn.com/w40/cr.png', 'CONCACAF'),
('Jamaica',      'jamaica',      'https://flagcdn.com/w40/jm.png', 'CONCACAF'),
('Honduras',     'honduras',     'https://flagcdn.com/w40/hn.png', 'CONCACAF'),
('Guatemala',    'guatemala',    'https://flagcdn.com/w40/gt.png', 'CONCACAF'),

-- CAF (Africa)
('Morocco',      'morocco',      'https://flagcdn.com/w40/ma.png', 'CAF'),
('Senegal',      'senegal',      'https://flagcdn.com/w40/sn.png', 'CAF'),
('Egypt',        'egypt',        'https://flagcdn.com/w40/eg.png', 'CAF'),
('Nigeria',      'nigeria',      'https://flagcdn.com/w40/ng.png', 'CAF'),
('Cameroon',     'cameroon',     'https://flagcdn.com/w40/cm.png', 'CAF'),
('South Africa', 'south-africa', 'https://flagcdn.com/w40/za.png', 'CAF'),
('Ivory Coast',  'ivory-coast',  'https://flagcdn.com/w40/ci.png', 'CAF'),
('Algeria',      'algeria',      'https://flagcdn.com/w40/dz.png', 'CAF'),
('Tunisia',      'tunisia',      'https://flagcdn.com/w40/tn.png', 'CAF'),
('Mali',         'mali',         'https://flagcdn.com/w40/ml.png', 'CAF'),
('Ghana',        'ghana',        'https://flagcdn.com/w40/gh.png', 'CAF'),
('Tanzania',     'tanzania',     'https://flagcdn.com/w40/tz.png', 'CAF'),

-- AFC (Asia)
('Japan',        'japan',        'https://flagcdn.com/w40/jp.png', 'AFC'),
('South Korea',  'south-korea',  'https://flagcdn.com/w40/kr.png', 'AFC'),
('Iran',         'iran',         'https://flagcdn.com/w40/ir.png', 'AFC'),
('Saudi Arabia', 'saudi-arabia', 'https://flagcdn.com/w40/sa.png', 'AFC'),
('Australia',    'australia',    'https://flagcdn.com/w40/au.png', 'AFC'),
('Qatar',        'qatar',        'https://flagcdn.com/w40/qa.png', 'AFC'),
('Uzbekistan',   'uzbekistan',   'https://flagcdn.com/w40/uz.png', 'AFC'),
('Iraq',         'iraq',         'https://flagcdn.com/w40/iq.png', 'AFC'),
('Jordan',       'jordan',       'https://flagcdn.com/w40/jo.png', 'AFC'),
('Indonesia',    'indonesia',    'https://flagcdn.com/w40/id.png', 'AFC'),
('Oman',         'oman',         'https://flagcdn.com/w40/om.png', 'AFC'),
('China',        'china',        'https://flagcdn.com/w40/cn.png', 'AFC'),
('UAE',          'uae',          'https://flagcdn.com/w40/ae.png', 'AFC'),

-- OFC (Oceania)
('New Zealand',  'new-zealand',  'https://flagcdn.com/w40/nz.png', 'OFC');


-- ─── Cities ──────────────────────────────────────────────────

INSERT INTO cities (name, slug, state, description, featured) VALUES
('New York / New Jersey', 'new-york-new-jersey', 'New York / New Jersey',
 'The Big Apple — one of the world''s great cities. MetLife Stadium sits just across the Hudson River in New Jersey and will host the World Cup Final.',
 true),

('Los Angeles',           'los-angeles',         'California',
 'Entertainment capital of the world. Sun, beaches, Hollywood, and world-class football at SoFi Stadium.',
 true),

('Dallas',                'dallas',              'Texas',
 'The heart of Texas. A massive city with Southern hospitality, incredible food, and AT&T Stadium — one of the largest domed stadiums on earth.',
 true),

('San Francisco / Bay Area', 'san-francisco',    'California',
 'The Bay Area — Levi''s Stadium in Santa Clara brings together Silicon Valley and world football.',
 false),

('Seattle',               'seattle',             'Washington',
 'The Emerald City. Known for its passionate football culture, stunning scenery, and Lumen Field — one of the loudest stadiums in the world.',
 false),

('Boston',                'boston',              'Massachusetts',
 'America''s most historic city. Rich in culture, incredible seafood, and Gillette Stadium just south of the city.',
 false),

('Philadelphia',          'philadelphia',        'Pennsylvania',
 'The City of Brotherly Love. Home of the Liberty Bell, a legendary food scene, and Lincoln Financial Field.',
 false),

('Miami',                 'miami',               'Florida',
 'The most international city in America. Miami''s Latin energy, nightlife, and Hard Rock Stadium make it a natural home for world football.',
 true),

('Atlanta',               'atlanta',             'Georgia',
 'The capital of the South. Mercedes-Benz Stadium is one of the most impressive venues in world sport.',
 false),

('Kansas City',           'kansas-city',         'Missouri',
 'Barbecue capital of the world. Arrowhead Stadium is one of America''s most iconic venues and consistently ranks as the loudest in the NFL.',
 false),

('Houston',               'houston',             'Texas',
 'A true global city — one of the most diverse in the US. NRG Stadium and a buzzing international food scene await.',
 false);


-- ─── Stadiums ────────────────────────────────────────────────

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'MetLife Stadium',         82500,
  'Home of the New York Giants and Jets, MetLife Stadium will host the 2026 World Cup Final — the crown jewel of the tournament.'
FROM cities WHERE slug = 'new-york-new-jersey';

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'SoFi Stadium',            70240,
  'Opened in 2020, SoFi Stadium is one of the most modern and technologically advanced stadiums ever built.'
FROM cities WHERE slug = 'los-angeles';

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'AT&T Stadium',            80000,
  'Known as "Jerry World," AT&T Stadium in Arlington is one of the largest domed stadiums on the planet.'
FROM cities WHERE slug = 'dallas';

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'Levi''s Stadium',         68500,
  'Home of the San Francisco 49ers, Levi''s Stadium sits in the heart of Silicon Valley in Santa Clara.'
FROM cities WHERE slug = 'san-francisco';

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'Lumen Field',             69000,
  'One of the loudest stadiums in professional football. The 12th Man culture of Seattle makes for an electric atmosphere.'
FROM cities WHERE slug = 'seattle';

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'Gillette Stadium',        65878,
  'Home of the New England Patriots in Foxborough, Massachusetts — about 30 miles south of Boston.'
FROM cities WHERE slug = 'boston';

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'Lincoln Financial Field', 69796,
  'Home of the Philadelphia Eagles — a passionate fanbase and a great open-air stadium in South Philadelphia.'
FROM cities WHERE slug = 'philadelphia';

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'Hard Rock Stadium',       65326,
  'Home of the Miami Dolphins. Located in Miami Gardens, it hosted the 1994 World Cup Final and is no stranger to global football.'
FROM cities WHERE slug = 'miami';

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'Mercedes-Benz Stadium',   71000,
  'Arguably the most beautiful stadium in North America. The retractable roof and 360° halo board are unlike anything else.'
FROM cities WHERE slug = 'atlanta';

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'Arrowhead Stadium',       76416,
  'Home of the Kansas City Chiefs and consistently rated the loudest stadium in the NFL. A fortress of American football now ready for the world game.'
FROM cities WHERE slug = 'kansas-city';

INSERT INTO stadiums (city_id, name, capacity, description)
SELECT id, 'NRG Stadium',             72220,
  'The first NFL stadium with a retractable roof. Located in the Houston Medical Center area with excellent transport links.'
FROM cities WHERE slug = 'houston';
