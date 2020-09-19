/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUsers, getUserById } = require('../db/helperquery/users-queries');

// GET /users/
router.get('/', (req, res) => {
  getUsers()
    .then((users) => {
      res.json({ users });
    });
});

// create a fake route to test to make sure its working
router.get('/test', (req, res) => {

      res.json({ result: true });
});

// GET /users/:id
router.get('/:id', (req, res) => {
  getUserById(req.params.id)
    .then((user) => {
      res.json({ user });
    })
});

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
