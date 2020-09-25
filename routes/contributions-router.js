const express = require('express');
const router = express.Router();
const { getUpVotes, getStoryContributions, addUpVote } = require('../db/helperquery/contribution-query');

// GET Route to /contributions/:id
// Grabs all contributions related to a single Author Story
router.get('/:id', (req, res) => {
  getStoryContributions(req.params.id)
    .then((contributions) => {
      res.json({ contributions })
    })
    .catch((err) => console.log("Error for getStoryContributions", err));
});

// POST Route to /contributions/:id/upVotes
// A route that adds up total upVotes for a story contribution and
// then returns the total upVotes for that contribution
router.post('/:id/upVotes', (req, res) => {
  const userid = req.session.userid;
  addUpVote(req.params.id, userid)
    .then(({rows}) => {
      return getUpVotes(req.params.id);
    })
    .then(({rows}) => {
      res.json({...rows[0]})
    })
    .catch(err => console.log("Error with addupvote", err))
})

module.exports = router;

