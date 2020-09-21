const { response } = require('express');
const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool(dbParams);
db.connect();

// const pool = require('../../lib/db.js')

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
  const queryString = `SELECT stories.*
  FROM stories
  JOIN users ON users.id = stories.name_id
  WHERE users.id = $1`;
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
