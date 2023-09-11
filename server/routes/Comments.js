const express = require('express');
const router = express.Router();
const { Comment } = require("../models");
const { validateToken} = require('../middleware/AuthMiddleware')

router.get('/:postId', async (req,res) => {
    const postId = req.params.postId
    const comments = await Comment.findAll({where: {PostId: postId}})
    res.json(comments)
})

router.post("/", validateToken, async(req, res) => {
    const comment = req.body
    const displayname = req.user.displayname
    comment.displayname = displayname
    await Comment.create(comment)
    res.json(comment)
})

module.exports = router