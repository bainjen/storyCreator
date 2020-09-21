consr { response } = require('express');
const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool(dbParams);
db.connect();

// helper functions
// we have to POST the FROM(to post the story) (POST)
// to update stories (POST)
// to publish the final story (POST)

// to grab all stories (GET)
const browseStory = () => {
  return db.query("SELECT * FROM stories;")
  .then((response) => {
    return response.rows;
  })
  .catch((err) => console.log("Error for browseStory", err));
}

// to grab story/:id to read (GET)
const getStoryById = (id) => {
  return db.query("SELECT * FROM stories WHERE id = $1;", [id])
  .then((response) => {
    return response.rows[0];
  })
  .catch((err) => console.log("Error for getStoryById", err));
}

// we have to GET the FORM(to start the story) (GET)
const addStory = function(story) {

  // starting params are empty
  const queryParams = [];
  console.log(story)
  for (const key in story) {
    queryParams.push(story[key])
  }

  const queryString = `
  INSERT INTO stories
    (name_id, beginning_story, title, img_url, created_at, published, completed_at)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `;

  console.log(queryParams)
  return db.query(queryString, queryParams)
  .then(res => {
    return res.rows;
  })
  .catch((err) => console.log("Error for addStory", err));

}

module.exports = {
  browseStory,
  getStoryById,
  addStory
}


