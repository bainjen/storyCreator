const express = require('express');
const router = express.Router();
const { getUpVotes, getStoryContributions, addContribution, getCompletedStory, incompleteStory, addUpVote } = require('../db/helperquery/contribution-query');

//need to test this route
router.get('/:id', (req, res) => {
  getStoryContributions(req.params.id)
    .then((contributions) => {
      res.json({ contributions })
    })
    .catch((err) => console.log("Error for getStoryContributions", err));
});

router.post('/:id/upVotes', (req, res) => {
  console.log("SESSION ID", req.session.userid)
  const userid = req.session.userid;
  addUpVote(req.params.id, userid)
    .then(({rows}) => {
      // INSERT
      //add a query to count upvotes
      console.log("INSERTED ROW", rows[0])
      return getUpVotes(req.params.id);
      // res.send('All good')
    })
    .then(({rows}) => {
      console.log("COUNT ROWS!!", rows[0])
      res.json({...rows[0]})
    })
    .catch(err => console.log("Error with addupvote", err))
})

module.exports = router;

