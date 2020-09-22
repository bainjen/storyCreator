/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};


// <% if(req.session.id) { %>

//   <h1>this is a single story</h1>
//   <div>
//     <h1><%= story.title %></h1>
//   </div>
//   <div>

//     <% for (let contribution of contributions) { %>
//     <h1><%= contribution.story_id %></h1>
//     <h2><%= contribution.name_id %></h2>
//     <h3><%= contribution.text_addon %></h3>
//     <h4><%= contribution.accepted_at %></h4>
//     <% } %>

//     <% } else { %>
