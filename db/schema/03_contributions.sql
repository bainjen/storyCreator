DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) NOT NULL,
  name_id INTEGER REFERENCES users(id) NOT NULL,
  text_addon TEXT NOT NULL,
  accepted_at INTEGER DEFAULT 0
);

-- integer where 0 is falsy and number is an order
-- if value of accepted at >0, then it's been added to the story
