const express = require('express');
const router = express.Router();
const { Comment } = require("../models");

router.get('/:postId', async (req,res) => {
    const postId = req.params.postId
    const comments = await Comment.findAll({where: {PostId: postId}})
    res.json(comments)
})

router.post("/", async(req, res) => {
    const comment = req.body
    await Comment.create(comment)
    res.json(comment)
})

module.exports = router