const { response } = require('express');
const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const getStoryContributions = (id) => {
  const queryString = `SELECT stories.id, stories.title, stories.beginning_story,
  contributions.text_addon, contributions.accepted_at, users.name, COUNT(upVotes.contribution_id)
  FROM contributions
  JOIN users ON users.id = name_id
  RIGHT JOIN stories on stories.id = story_id
  FULL OUTER JOIN upVotes ON contributions.id = contribution_id
  WHERE stories.id = $1
  GROUP BY upVotes.contribution_id, stories.id, stories.title, stories.beginning_story,
  contributions.text_addon, contributions.accepted_at, users.name;`

  return db.query(queryString, [id])
    .then((response) => {
      return response.rows;
    })
    .catch((err) => console.log("Error for getStoryContributions", err));
}

const addContribution = (contributions) => {

  const queryString = `INSERT INTO contributions ( story_id, name_id, text_addon, accepted_at)
  VALUES ($1, $2, $3, NOW())
  RETURNING *;`;

  const values = [contributions.story_id, contributions.name_id, contributions.text_addon];
  return db.query(queryString, values)
    .then(res => res.rows[0])
    .catch((err) => console.log("Error for addContribution", err));
}

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
  return db.query(queryString, [id])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.log("Error for incompleteStory", err));
}


module.exports = { getStoryContributions, addContribution, getCompletedStory, incompleteStory };
