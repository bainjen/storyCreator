const express = require('express');
const router = express.Router();
const { getUpVotes, getStoryContributions, addUpVote } = require('../db/helperquery/contribution-query');

// GET Route to /contributions/:id
router.get('/:id', (req, res) => {
  getStoryContributions(req.params.id)
    .then((contributions) => {
      res.json({ contributions })
    })
    .catch((err) => console.log("Error for getStoryContributions", err));
});

// POST Route to /contributions/:id/upVotes
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

