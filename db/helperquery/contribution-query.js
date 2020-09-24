const { response } = require('express');
const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool(dbParams);
db.connect();

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
  contributions.text_addon, contributions.accepted_at, users.name, contributions.id;`

  return db.query(queryString, [id])
    .then((response) => {
      return response.rows;
    })
    .catch((err) => console.log("Error for getStoryContributions", err));
}

const addContribution = (contributions) => {

  const queryString = `INSERT INTO contributions ( story_id, name_id, text_addon, accepted_at)
  VALUES ($1, $2, $3, NULL)
  RETURNING *;`; // @TODO REVISIT ACCEPTED AT GOD WHAT ARE YOU THINKING

  const values = [contributions.story_id, contributions.name_id, contributions.text_addon];
  return db.query(queryString, values)
    .then(res => res.rows[0])
    .catch((err) => console.log("Error for addContribution", err));
}

// const getCompletedStory = (id) => {
//   const queryString = `SELECT published FROM stories WHERE published = TRUE;`
//   return db.query(queryString, [id])
//     .then(res => {
//       return res.rows;
//     })
//     .catch(err => console.log("Error for getCompletedStory", err));
// }

const incompleteStory = (id) => {
  const queryString = `SELECT stories.title, stories.beginning_story FROM stories WHERE published = FALSE;`
  return db.query(queryString, [id])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.log("Error for incompleteStory", err));
}

const addUpVote = (contributionId, name_id) => {
  const queryString = `INSERT INTO upVotes (contribution_id, name_id)
  VALUES ($1, $2)
  RETURNING *;`
  return db.query(queryString, [contributionId, name_id])
    // .then(res => {
    //   return res.rows[0];
    // })
    // .catch(err => {
    //   console.log('error for addupvote', err)
    //   throw 'SOMETHING WRONG HERE SHIT hAPPENED';
    // })
}

const getUpVotes = (contributionId) => {
  const queryString = `SELECT COUNT(*) FROM upVotes
  WHERE contribution_id = $1;`
  return db.query(queryString, [contributionId])
}

const getCompletedStory = () => {
  const queryString = `SELECT stories.title as titles,
  stories.beginning_story as storytext,
  contributions.text_addon as contributiontext
  FROM contributions
  JOIN stories on stories.id = story_id
  WHERE stories.published = true
  ORDER BY contribution.id;`

  return db.query(queryString)
}

const deleteContribution = (id) => {
  const queryString = `DELETE FROM contributions WHERE id =$1;`
    return db.query(queryString, [id])
}


module.exports = { getUpVotes, getStoryContributions, addContribution, getCompletedStory, incompleteStory, addUpVote, getCompletedStory };
