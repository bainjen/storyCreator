SELECT contributions.text_addon, COUNT(upVotes)
FROM contributions
JOIN upVotes ON contribution_id = contributions.id
GROUP BY contributions.text_addon;
