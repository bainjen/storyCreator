const express = require('express');
const router  = express.Router();
const { browseStory, getStoryById, addStory } = require('../db/helperquery/story-query');

// helper functions
// to grab all stories (GET)
// to grab story/:id to read (GET)
// we have to GET the FORM(to start the story) (GET)
// we have to POST the FROM(to post the story) (POST)
// to update stories (POST)
// to publish the final story (POST)

router.get('/', (req, res) => {
  browseStory()
    .then((stories) => {
      res.json({ stories })
    })
    .catch((err) => console.log("Error for browseStory", err));
});

router.get('/:id', (req, res) => {
  getStoryById(req.params.id)
    .then((stories) => {
      res.json({ stories })
    })
    .catch((err) => console.log("Error for getStoryByID", err));
});

//need to ask how to test this fuctionality
router.post('/stories', (req, res) => {
  const userId = req.params.id;
  addStory({ ...req.body, username_id: userId })
    .then(story => {
      res.send( { story });
    })
    .catch((err) => console.log("Error for addStory", err));
});

  // return router;


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

