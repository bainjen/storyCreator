DROP TABLE IF EXISTS stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  name_id INTEGER REFERENCES users(id) NOT NULL,
  beginning_story TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  img_url TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  published BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMP NULL DEFAULT NULL
);


-- //need to update query to grab the text from contrinutions where the story id on contributions = story contribution on contribution TABLE
-- and accpeted_at = true

-- //put request accept contribution put request to true
