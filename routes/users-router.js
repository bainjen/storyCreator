/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUsers, getUserById, getUserStoriesByUserId } = require('../db/helperquery/users-queries');

// GET /users/
router.get('/', (req, res) => {
  getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => console.log("Error for getUsers", err));
});

// create a fake route to test to make sure its working
router.get('/test', (req, res) => {

      res.json({ result: true });
});

//nothing showing in users/:id
router.get('/:id', (req, res) => {
  //make a helper function that queries the database to get stories by user id.
  const userid = req.session.userid;
  getUserStoriesByUserId(userid)
    .then((myStories) => {
    // console.log(myStories)
    res.json({myStories})
  })
  .catch((err) => console.log("getUserStoriesByUserId", err));
})

module.exports = router;

