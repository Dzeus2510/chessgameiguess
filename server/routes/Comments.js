const express = require('express');
const router = express.Router();
const { Comment } = require("../models");
const { validateToken} = require('../middleware/AuthMiddleware')

router.get('/:postId', async (req,res) => {
    const postId = req.params.postId
    const comments = await Comment.findAll({where: {PostId: postId}})
    res.json(comments)
})
//get postId from frontend param, then find all comments that have the same postId to show 

router.post("/", validateToken, async(req, res) => {
    const comment = req.body
    const displayname = req.user.displayname
    comment.displayname = displayname
    await Comment.create(comment)
    res.json(comment)
})
//Post a comment

router.delete("/:commentId", validateToken, async(req,res) => {
    const commentId = req.params.commentId

    await Comment.destroy({where: {
        id: commentId
    }})
    res.json("deleted")
})
//Find the comment with the commentId, then delete it from the database


module.exports = router