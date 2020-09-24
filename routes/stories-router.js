const express = require('express');
const router = express.Router();
const { browseStory, getStoryById, addStory, browseSelectStories, updateStory, storyPublished } = require('../db/helperquery/story-query');
const { getStoryContributions, addContribution, addUpVote, getCompletedStory, updateAcceptedAtTrue } = require('../db/helperquery/contribution-query');
const { getUserStoriesByUserId } = require('../db/helperquery/users-queries');
const { urlencoded } = require('body-parser');

// helper functions
// to grab all stories (GET)
// to grab story/:id to read (GET)
// we have to GET the FORM(to start the story) (GET)
// we have to POST the FROM(to post the story) (POST)
// to update stories (POST)
// to publish the final story (POST)

//this is GET /stories

//this is where we go when we click on a specific story (id linked to story)
//this shares an ejs page with /mystories --> We render the ejs file using templateVars here that filter out the user's own stories
//in /mystories we will also render this page, however, we will change the template vars to filer for the user's own stories

// GET /stories
router.get('/', (req, res) => {
  browseSelectStories(req.session.userid)
    .then((stories) => {
      const templateVars = { stories: stories, user: req.session.userid }
      // res.json({ stories })
      // console.log(templateVars)
      res.render('homepage', templateVars)
    })
    .catch((err) => console.log("Error for browseStory", err));
});

router.get('/me', (req, res) => {
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
  let templateVars = { user: req.session.userid };
  console.log(req.params.id)
  getStoryById(req.params.id)
    .then((story) => {
      console.log('This is story:', story);
      templateVars.story = story;
      // console.log('TEMPLATEVARS', templateVars);
      // res.json({ stories })
    })
    .then(() => {
      getStoryContributions(req.params.id)
        .then((contributions) => {
          templateVars.contributions = contributions;
          console.log("Contribution templateVARs", templateVars);
          res.render('readstory', templateVars)
        })
        .catch((err) => console.log("Error for getStoryContributions", err));
    })
});

router.post('/:id', (req, res) => {
console.log('REQ.PARAMS.ID', req.params.id)
  // if (!req.body.text) {
  //   res.status(400).json({ error: 'invalid request: no data in POST body' });
  //   return;
  // }
  console.log('REQ.BODY: ', req.body)
  console.log('REQ.PARAMS: ', req.params)
  console.log('OUR OBJECTS', { ...req.body, name_id: req.session.userid })
  addContribution({ story_id: req.params.id, name_id: req.session.userid, ...req.body })
    .then((response) => {
      // res.send(response.rows)
      res.redirect(`/stories/${req.params.id}`)
      //if we did this in ejs, we would do res.render
    })
});

//need to ask how to test this fuctionality
router.post('/', (req, res) => {
  //need a way to reference who is currently logged in
  //need a cookie to save user id
  const user = req.body
  // console.log('req.body log', req.body)
  addStory({ ...req.body, name_id: req.session.userid })
    .then(() => {
      // req.session.userid = user
      res.redirect('/stories/me');
    })
    .catch((err) => console.log("Error for addStory", err));
});

// Endpoint for updating the contributions
router.put('/:id', (req, res) => {

  updateAcceptedAtTrue(req.body.contributionId)
    .then((response) => {
      console.log("WHAT IS REQ> BODY", req.body.contributionId)
      console.log("REPSONSE BEFORE COMPLETED STORY", response)
      return getCompletedStory(req.params.id);
    })
    .then((response) => {
      console.log("RESPONSE AFTER COMPLETE STORY", response.rows)
      res.json(response.rows)
    })
    .catch(err => console.log("Error with getCompletedStory", err))
})

router.post('/:id/publish', (req, res) => {

  storyPublished(req.params.id)
    .then(() => {
    res.redirect('/stories/me')
    })
    .catch(err => console.log("Error with storyPublished", err))
});

// router.delete('/:id/contributions/:id', (req, res) => {

// })

module.exports = router;

//+++++++STORIES ROUTES+++++++

//NEW STORY (ADD) POST /stories/:id
//user will need to see a form where they can fill in the picture, the title, and the beginning of the story
//INCOMPLETE STORY (EDIT) POST /stories/:id/edit
//user will need to click submit to push the story out to other users for contirbutions
//COMPLETE STORY (ADD) POST /stories/:id/new
//user will close off contributions to story by publishing the complete story for other users to read
//BROWSE STORIES GET /stories
//users can see all of the in progress and completed stories
//READ STORY GET /stories/:id
//users can read other users' stories

//POST to STORIES

// CRUD --create/read/update/delete
// BREAD --browse/read/edit/add/delete
//new
//listing(reading)/adding/updating(editing)/deleting/showing(browse)

//BREAD AND CRUD

