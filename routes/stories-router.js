const express = require('express');
const router = express.Router();
const { browseStory, getStoryById, addStory, browseSelectStories, updateStory, storyPublished } = require('../db/helperquery/story-query');
const { getStoryContributions, addContribution, addUpVote, getCompletedStory, updateAcceptedAtTrue, countContributions } = require('../db/helperquery/contribution-query');
const { getUserStoriesByUserId } = require('../db/helperquery/users-queries');
const { urlencoded } = require('body-parser');

// GET Route for /stories page to show stories not related to logged in user
router.get('/', (req, res) => {
  browseSelectStories(req.session.userid)
    .then((stories) => {
      const templateVars = { stories: stories, user: req.session.userid }
      res.render('homepage', templateVars)
    })
    .catch((err) => console.log("Error for browseStory", err));
});

// GET Route to logged in users own story page
router.get('/me', (req, res) => {
  getUserStoriesByUserId(req.session.userid)
    .then((stories) => {
      const templateVars = { stories: stories, user: req.session.userid }
      res.render('homepage', templateVars)
    })
    .catch((err) => console.log("Error for getUserStoriesByUserId", err));
});

// GET Route to grab personal stories for a particular user and contributions
router.get('/:id', (req, res) => {
  let templateVars = { user: req.session.userid };
  getStoryById(req.params.id)
    .then((story) => {
      templateVars.story = story;

    })
    .then(() => {
      getStoryContributions(req.params.id)
        .then((contributions) => {
          templateVars.contributions = contributions;
          res.render('readstory', templateVars)
        })
        .catch((err) => console.log("Error for getStoryContributions", err));
    })
});

// POST Route for readers to add story contributions
router.post('/:id', (req, res) => {
  addContribution({ story_id: req.params.id, name_id: req.session.userid, ...req.body })
    .then((response) => {
      res.redirect(`/stories/${req.params.id}`)
    })
});

// POST route for users to create their own story
router.post('/', (req, res) => {
  const user = req.body
  addStory({ ...req.body, name_id: req.session.userid })
    .then(() => {
      res.redirect('/stories/me');
    })
    .catch((err) => console.log("Error for addStory", err));
});

// PUT Route/Endpoint for updating the contributions
router.put('/:id', (req, res) => {
  countContributions(req.params.id)
    .then(({ rows }) => {
      updateAcceptedAtTrue(rows.length + 1, req.body.contributionId)
        .then((response) => {
          return getCompletedStory(req.params.id);
        })
        .then((response) => {
          res.json(response.rows)
        })
        .catch(err => console.log("Error with getCompletedStory", err))
    })
})

// POST Route for logged in users to change their story from incomplete to complete
router.post('/:id/publish', (req, res) => {
  storyPublished(req.params.id)
    .then(() => {
      res.redirect('/stories/me')
    })
    .catch(err => console.log("Error with storyPublished", err))
});

// @TODO Route that we have yet to implement
// router.delete('/:id/contributions/:id', (req, res) => {

// })

module.exports = router;
