const express = require('express');
const router = express.Router();
const { getUserStoriesByUserId } = require('../db/helperquery/users-queries');
const { getStoryContributions } = require('../db/helperquery/contribution-query');
const { getStoryById } = require('../db/helperquery/story-query')
// get all stories for a single users
//get all contributions for a single user

router.get('/', (req, res) => {
  getUserStoriesByUserId(req.session.userid)
    .then((myStories) => {
      // res.json({ myStories });
      const templateVars = { myStories: myStories }
      // console.log(myStories);
      console.log('TEMPLATEVARS', templateVars);
      // res.json({ stories })
      res.render('mystory', templateVars)
    })
    .catch((err) => console.log("Error for getUserStoriesByUserId", err));
});

router.get('/:id', (req, res) => {
  let templateVars = {};
  getStoryById(req.params.id)
    .then((story) => {
      // res.json({ myStories });
      templateVars.story = story;
      // console.log(myStories);
      console.log('TEMPLATEVARS', templateVars);
      // res.json({ stories })
    })
    .catch((err) => console.log("Error for getUserStoryById", err));

  getStoryContributions(req.params.id)
    .then((contributions) => {
      templateVars.contributions = contributions;
    })
    .catch((err) => console.log("Error for getStoryContributions", err));
    res.render('author-story', templateVars)
});

module.exports = router;
