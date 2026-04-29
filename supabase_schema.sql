-- Create a table for match reactions
CREATE TABLE reactions (
  id BIGSERIAL PRIMARY KEY,
  match_id BIGINT NOT NULL,
  emoji TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  UNIQUE(match_id, emoji)
);

-- Policy to allow anyone to read and update counts
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert/update" ON reactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON reactions
  FOR UPDATE USING (true);
