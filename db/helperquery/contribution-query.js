const { response } = require('express');
const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Grab all contributions related to a single Author Story
const getStoryContributions = (id) => {
  const queryString = `SELECT stories.id, stories.title, stories.beginning_story,
  contributions.text_addon, contributions.accepted_at, users.name, contributions.id,
  COUNT(upVotes.contribution_id)
  FROM contributions
  JOIN users ON users.id = name_id
  RIGHT JOIN stories on stories.id = story_id
  FULL OUTER JOIN upVotes ON contributions.id = contribution_id
  WHERE stories.id = $1
  GROUP BY upVotes.contribution_id, stories.id, stories.title, stories.beginning_story,
  contributions.text_addon, contributions.accepted_at, users.name, contributions.id
  ORDER BY contributions.accepted_at;`

  return db.query(queryString, [id])
    .then((response) => {
      return response.rows;
    })
    .catch((err) => console.log("Error for getStoryContributions", err));
}

// Add a story contribution to a story in progress
const addContribution = (contributions) => {
  const queryString = `INSERT INTO contributions ( story_id, name_id, text_addon, accepted_at)
  VALUES ($1, $2, $3, NULL)
  RETURNING *;`; // @TODO REVISIT ACCEPTED AT GOD WHAT ARE YOU THINKING

  const values = [contributions.story_id, contributions.name_id, contributions.text_addon];
  return db.query(queryString, values)
    .then(res => res.rows[0])
    .catch((err) => console.log("Error for addContribution", err));
}

/**
 *
 * @param {*} function query on DB
 * @returns Grabs all stories where published boolean is false
 */
const incompleteStory = (id) => {
  const queryString = `SELECT stories.title, stories.beginning_story FROM stories WHERE published = FALSE;`
  return db.query(queryString, [id])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.log("Error for incompleteStory", err));
}

/**
 * @param {*} addUpVote function query on DB
 * @return Adds total upVotes for a certain story contribution
 */
const addUpVote = (contributionId, name_id) => {
  const queryString = `INSERT INTO upVotes (contribution_id, name_id)
  VALUES ($1, $2)
  RETURNING *;`
  return db.query(queryString, [contributionId, name_id])
}

/**
 * @param {*} getUpVotes function query on DB
 * @return Grabs all upVotes for a story contribution
 */
const getUpVotes = (contributionId) => {
  const queryString = `SELECT COUNT(*) FROM upVotes
  WHERE contribution_id = $1;`
  return db.query(queryString, [contributionId])
}

// Grabs the completed story including story contributions
const getCompletedStory = (storyid) => {
  const queryString = `SELECT stories.title as titles,
  stories.beginning_story as storytext,
  contributions.text_addon as contributiontext
  FROM contributions
  JOIN stories on stories.id = story_id
  WHERE stories.id = $1 AND contributions.accepted_at > 0
  ORDER BY contributions.accepted_at;`

  return db.query(queryString,[storyid])
}

// @TODO function to implement to give author ability to remove a contribution
const deleteContribution = (id) => {
  const queryString = `DELETE FROM contributions WHERE id =$1;`
    return db.query(queryString, [id])
}

const countContributions = (storyid) => {
  const queryString = `SELECT * FROM contributions WHERE accepted_at > 0 AND story_id = $1;`
  return db.query(queryString, [storyid])
}

const updateAcceptedAtTrue = (accepted_at, contributionId) => {
  const queryString = `UPDATE contributions SET accepted_at = $1 WHERE id = $2;`
  return db.query(queryString, [accepted_at, contributionId])
}


module.exports = { updateAcceptedAtTrue, getUpVotes, getStoryContributions, addContribution, getCompletedStory, incompleteStory, addUpVote, getCompletedStory, countContributions };
