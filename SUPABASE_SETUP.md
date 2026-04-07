# 🧩 Supabase Setup Guide

## 1. Create Project
- Go to Supabase
- Create new project

---

## 2. Enable Auth
- Email auth only (MVP)

---

## 3. Create Tables
Run SQL:

CREATE TABLE cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  slug text UNIQUE,
  state text,
  country text,
  description text,
  hero_image_url text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE stadiums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  city_id uuid REFERENCES cities(id),
  capacity int,
  description text,
  image_url text
);

CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id),
  stadium_id uuid REFERENCES stadiums(id),
  match_date timestamp,
  home_team text,
  away_team text,
  stage text
);

CREATE TABLE places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id),
  name text,
  type text,
  description text,
  address text,
  image_url text,
  tags jsonb,
  created_at timestamp DEFAULT now()
);

CREATE TABLE itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id),
  title text,
  duration text,
  content text
);

CREATE TABLE favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  place_id uuid REFERENCES places(id),
  city_id uuid REFERENCES cities(id),
  created_at timestamp DEFAULT now()
);

---

## 4. RLS Policies

Enable Row Level Security:

- favorites: user can only see their own
- others: public read

---

## 5. Storage
- Create bucket: "images"