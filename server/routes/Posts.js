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
//get all liked posts in the list of posts that the user liked

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    res.json(post)
})
//get the post with the chosen id

router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.displayname = req.user.displayname
    post.UserId = req.user.id
    await Post.create(post);
    //wait for thing to insert
    res.json(post);
});
//create a post


router.put("/title", validateToken, async (req, res) => {
    const {newTitle, id} = req.body;
    await Post.update({title: newTitle}, {where: {id : id}})
    res.json(newTitle);
});
//update the title of the post

router.put("/postText", validateToken, async (req, res) => {
    const {newPostText, id} = req.body;
    await Post.update({postText: newPostText}, {where: {id : id}})
    res.json(newPostText);
});
//update the content of the post

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId
    await Post.destroy({
        where: {
            id: postId
        }
    })
    res.json("Post deleted")
})
//find the post with postId and Delete from database

router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id
    const listOfPosts = await Post.findAll({ where: { UserId: id }, include: [Like], })
    res.json(listOfPosts)
})
//get all the post that have the userId

module.exports = router