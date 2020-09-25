const { response } = require('express');
const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const getUsers = () => {
  return db.query("SELECT * FROM users;")
    .then((response) => {
      return response.rows;
    });
};

const getUserById = (id) => {
  return db.query("SELECT * FROM users WHERE id = $1;", [id])
    .then((response) => {
      return response.rows[0];
    });
};

const getUserStoriesByUserId = (id) => {
  const queryString = `SELECT stories.*, contributions.*
  FROM stories
  JOIN users ON users.id = stories.name_id
  JOIN contributions ON contributions.story_id = stories.id
  WHERE users.id = $1
  ORDER BY contributions.accepted_at;`;
  return db.query(queryString, [id])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getUsers,
  getUserById,
  getUserStoriesByUserId
};
