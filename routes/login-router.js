const express = require('express');
const router = express.Router();

const login = (db) => {

  router.post('/:id', (req, res) => {
    req.session.user_id = req.params.id
    res.redirect('/')
})
return router;
}

module.exports = login;


//+++++++LOGIN ROUTES+++++++
//POST to LOGIN/:id --> this is our fake login - we don't need a get request for a login page (edit)
//When a user logs in, they should see: a list of stories + story status (completed or in progress)
//POST to LOGOUT --> If we have time, redirect to a fake login page (edit)



//router.get('/login/:id', req, res) => {
//  req.session.user_id = req.params.id
//  res.redirect('/')
// })


// const postRouter = (db) => {
//   // GET /posts/
//   router.get('/', (req, res) => {
//     const query = 'SELECT * FROM posts;';
//     db.query(query)
//       .then((response) => {
//         res.json({ posts: response.rows });
//       });
//   });

//   // GET /posts/:id
//   router.get('/:id', (req, res) => {
//     const query = 'SELECT * FROM posts WHERE id = $1;';
//     db.query(query, [req.params.id])
//       .then((response) => {
//         res.json({ post: response.rows[0] });
//       });
//   });

//   return router;
// };

// module.exports = postRouter;
