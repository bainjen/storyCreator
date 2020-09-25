const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../db/helperquery/users-queries');
const { browseStory, getStoryById, addStory } = require('../db/helperquery/story-query');

// GET Route to Login Page
router.get('/', (req, res) => {
  res.render('login')
});

// POST Route For Login Page
router.post('/', (req, res) => {
  req.session.password =req.body.password;
  req.session.userid = req.body.userid;
  res.redirect('/stories')
})

module.exports = router;
