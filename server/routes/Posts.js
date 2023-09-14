const express = require('express');
const router = express.Router();
const { Post, Like } = require("../models");

const { validateToken } = require("../middleware/AuthMiddleware")

//async is like a secret method ?
router.get("/", validateToken, async (req, res) => {
    const listOfPost = await Post.findAll({ include: [Like] });

    const likedPosts = await Like.findAll({ where: { UserId: req.user.id } })
    res.json({ listOfPost: listOfPost, likedPosts: likedPosts });
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    res.json(post)
})

router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.displayname = req.user.displayname
    post.UserId = req.user.id
    await Post.create(post);
    //wait for thing to insert
    res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId
    await Post.destroy({
        where: {
            id: postId
        }
    })
    res.json("Post deleted")
})

router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id
    const listOfPosts = await Post.findAll({ where: { UserId: id }, include: [Like], })
    res.json(listOfPosts)
})

module.exports = router