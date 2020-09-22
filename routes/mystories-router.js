const express = require('express');
const router = express.Router();
const { getUserStoriesByUserId } = require('../db/helperquery/users-queries');
const { getStoryContributions } = require('../db/helperquery/contribution-query');
const { getStoryById } = require('../db/helperquery/story-query')

// get all stories for a single users
//get all contributions for a single user
router.get('/', (req, res) => {
  getUserStoriesByUserId(req.session.userid)
    .then((stories) => {
      const templateVars = { stories: stories, user: req.session.userid }
      // res.json({ stories })
      // console.log(templateVars)
      res.render('homepage', templateVars)
    })
    .catch((err) => console.log("Error for getUserStoriesByUserId", err));
});

router.get('/:id', (req, res) => {
  const userid = req.session.userid
  let templateVars = {userid: userid};
  getStoryById(req.params.id)
    .then((story) => {
      templateVars.story = story;
    })
    .catch((err) => console.log("Error for getUserStoryById", err));

  getStoryContributions(req.params.id)
    .then((contributions) => {
      templateVars.contributions = contributions;
    })
    .catch((err) => console.log("Error for getStoryContributions", err));
  res.render('readstory', templateVars)
});

router.post('/:id', (req, res) => {

})

module.exports = router;
