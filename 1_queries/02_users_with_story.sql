-- grab all users with a story
SELECT *
FROM stories
JOIN users ON name_id = users.id;
