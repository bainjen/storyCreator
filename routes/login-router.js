const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../db/helperquery/users-queries');
const { browseStory, getStoryById, addStory } = require('../db/helperquery/story-query');

  router.get('/', (req, res) => {
    // browseStory()
    //   .then(story)
    // res.render('storypage');
    // console.log("CHECK");
    res.render('login')
    // return router;
  })

  router.post('/', (req, res) => {
    req.session.userid = req.body.userid;

    res.redirect('/stories')
  })

  // router.post('/', (req, res) => {
  //   const userID = getUserById(req.params.userid)
  //   console.log("DO you get me the ID", getUserById(req.params.userid))
  //   // const userid = req.body.userid;
  //   // const userPW = req.body.password;
  //   // const userID = getUserById(id);
  //   // req.session.userid = userID.id;
  //   res.redirect('/storypage');
  // })

  // router.post('/', (req, res) => {
  //   console.log("WHAT IS GOING HERE req", req)
  //   console.log("PART 2 res", res);
  //   getUserById(req.params.userid)
  //     .then(story => {
  //       res.render('storypage')
  //    })
  //  });





module.exports = router;


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
