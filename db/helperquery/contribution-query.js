// get all contributions by story id (GET)
// get contribution form (GET)
// and add a contribution to a story (POST)
//

//make a query that pulls out all contirbutions by story id
//join users to get username
//from stories

const { response } = require('express');
const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const getStoryContributions = (id) => {
  const queryString = `SELECT stories.id, stories.title, stories.beginning_story,
  contributions.text_addon, users.name
  FROM contributions
  JOIN users ON users.id = name_id
  RIGHT JOIN stories on stories.id = story_id
  WHERE stories.id = $1;`

  return db.query(queryString, [id])
  .then((response) => {
    return response.rows;
  })
  .catch((err) => console.log("Error for getStoryContributions", err));
}

const addContribution = (contributions) => {

  const queryString = `INSERT INTO contributions ( story_id, name_id, text_addon, accepted_at)
  VALUES ($1, $2, $3, NULL)
  RETURNING *;`;

  const values = [contributions.story_id,contributions.name_id,  contributions.text_addon];
  return db.query(queryString, values)
    .then(res => res.rows[0])
    .catch((err) => console.log("Error for addContribution", err));
}
// INSERT INTO contributions (name_id, story_id, text_addon, accepted_at)
// VALUES (1, 2, "hello word", "20:02:00")

const getCompletedStory = (id) => {
  const queryString = `SELECT published FROM stories WHERE published = TRUE;`
  return db.query(queryString, [id])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.log("Error for getCompletedStory", err));
}

const incompleteStory = (id) => {
  const queryString = `SELECT stories.title, stories.beginning_story FROM stories WHERE published = FALSE;`
  return db.query(queryStCanvasRenderingContext2D, [id])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.log("Error for incompleteStory", err));
}


module.exports = { getStoryContributions, addContribution, getCompletedStory, incompleteStory };
