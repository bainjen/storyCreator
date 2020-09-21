const express = require('express');
const router = express.Router();
const { getStoryContributions, addContribution, getCompletedStory, incompleteStory } = require('../db/helperquery/contribution-query');

//need to test this route
router.get('/:id', (req, res) => {
  getStoryContributions(req.params.id)
    .then((contributions) => {
      res.json({ contributions })
    })
    .catch((err) => console.log("Error for getStoryContributions", err));
});


