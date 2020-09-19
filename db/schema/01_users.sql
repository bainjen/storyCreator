-- Drop and recreate Users table
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
  -- username VARCHAR(255) NOT NULL,
  -- first_name VARCHAR(255) NOT NULL,
  -- last_name VARCHAR(255) NOT NULL
);
