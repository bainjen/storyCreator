DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) NOT NULL,
  name_id INTEGER REFERENCES users(id) NOT NULL,
  text_addon TEXT NOT NULL,
  accepted_at TIMESTAMP NOT NULL
);
