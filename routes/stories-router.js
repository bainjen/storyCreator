const express = require('express');
const router  = express.Router();
const { browseStory, getStoryById, addStory, browseSelectStories} = require('../db/helperquery/story-query');

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

router.get('/', (req, res) => {
  browseSelectStories(req.session.userid)
    .then((stories) => {
      const templateVars = {stories: stories, user: !req.session.userid }
      // res.json({ stories })
      console.log(templateVars)
      res.render('homepage', templateVars)
    })
    .catch((err) => console.log("Error for browseStory", err));
});


router.get('/:id', (req, res) => {
  console.log('req.params.id', req.params.id)
  getStoryById(req.params.id)
    .then((readstory) => {
      // res.json({ stories })
      const templateVars = { readstory: readstory }
      console.log(templateVars)
      res.render('readstory', templateVars)
    })
    .catch((err) => console.log("Error for getStoryByID", err));
});


// router.get('/:id', (req, res) => {
//   getStoryContributions(req.params.id)
//     .then((contributions) => {
//       res.json({ contributions })
//     })
//     .catch((err) => console.log("Error for getStoryContributions", err));
// });


// curl -d "title=some title&beginning_story=this is something&img_url= &published=true&completed_at=2018-02-12T08:40:00.000Z&created_at=2018-02-12T08:40:00.000Z" -X POST http://localhost:8080/stories

//need to ask how to test this fuctionality
router.post('/', (req, res) => {
  //need a way to reference who is currently logged in
  //need a cookie to save user id
  const userId = 1;
  console.log('re.body log', req.body)
  addStory({ ...req.body, name_id: userId })
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

