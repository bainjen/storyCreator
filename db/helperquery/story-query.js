const { response } = require('express');
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

//grab stories that don't belon to logged in user
const browseSelectStories = (id) => {
  return db.query("SELECT * FROM stories WHERE NOT id = $1;", [id])
  .then((response) => {
    return response.rows;
  })
  .catch((err) => console.log("Error for browseSelectStories", err));
}

// to grab story/:id to read (GET)
const getStoryById = (id) => {
  return db.query("SELECT stories.*, users.name FROM stories JOIN users ON users.id = stories.name_id WHERE stories.id = $1;", [id])
  .then((response) => {
    return response.rows[0];
  })
  .catch((err) => console.log("Error for getStoryById", err));
}

// we have to GET the FORM(to start the story) (GET)
//creates a new story in the database
const addStory = function(story) {

  // starting params are empty
  // console.log(story);
  // const queryParams = [];
  // for (const key in story) {
  //   queryParams.push(story[key])
  //   console.log(key)
  // }

  const queryString = `
  INSERT INTO stories
    (name_id, beginning_story, title, img_url, created_at, published, completed_at)
  VALUES ($1, $2, $3, $4, NOW(), FALSE, NULL)
  RETURNING *;
  `;

  const queryParams = [story.name_id, story.beginning_story, story.title, story.img_url]
  console.log(queryParams)
  return db.query(queryString, queryParams)
  .then(res => {
    return res.rows[0];
  })
  .catch((err) => console.log("Error for addStory", err));

}

//updates existing story in the database
const updateStory = (id) => {
  const queryString = `UPDATE stories SET title = $1, beginning_story = $2, img_url = $3 WHERE name_id = $4
  RETURNING *;`
  const queryParams = [req.body.title, req.body.beginning_story, req.body.img_url, req.params.id]

  return db.query(queryString, queryParams)
    .then(() => {
    return console.log('WHAT DO WE DO!?')
  })
}

module.exports = {
  browseStory,
  getStoryById,
  addStory,
  browseSelectStories,
  updateStory
}


