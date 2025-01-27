/*
  # Create ratings table for recipe ratings

  1. New Tables
    - `ratings`
      - `id` (uuid, primary key)
      - `recipe_id` (integer, not null)
      - `user_id` (uuid, not null, references auth.users)
      - `rating` (integer, not null, between 1 and 5)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `ratings` table
    - Add policies for:
      - Users can read all ratings
      - Users can only create/update their own ratings
*/

CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id integer NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  UNIQUE(recipe_id, user_id)
);

ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Allow all users to read ratings
CREATE POLICY "Anyone can read ratings"
  ON ratings
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to create their own ratings
CREATE POLICY "Users can create their own ratings"
  ON ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own ratings
CREATE POLICY "Users can update their own ratings"
  ON ratings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);