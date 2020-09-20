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

module.exports = {
  getUsers,
  getUserById
};
