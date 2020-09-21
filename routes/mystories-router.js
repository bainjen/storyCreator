const express = require('express');
const router = express.Router();
const { getUserStoriesByUserId } = require('../db/helperquery/users-queries');
const { getStoryContributions } = require('../db/helperquery/contribution-query');


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

module.exports = router;
