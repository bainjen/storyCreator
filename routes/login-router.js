const express = require('express');
const router = express.Router();

const login = (db) => {
  router.get('/', (req, res) => {
    res.render('login');
    console.log("hello where am I ")
  })
  return router;
}

module.exports = login;


router.get("/", (req, res) => {
  db.query(`SELECT * FROM users;`)
    .then(data => {
      const users = data.rows;
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
return router;



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
