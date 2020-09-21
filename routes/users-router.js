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

// GET /users/:id
//need a way to save this throughout the application as the user cookie
// router.get('/:id', (req, res) => {
//   getUserById(req.params.id)
//     .then((user) => {
//       res.json({ user });
//     })
//     .catch((err) => console.log("Error for getUsersById", err));
// });

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







// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     db.query(`SELECT * FROM users;`)
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
