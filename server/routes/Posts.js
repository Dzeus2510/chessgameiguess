const express = require('express');
const router = express.Router();
const { Post, Like } = require("../models");

const{validateToken} = require("../middleware/AuthMiddleware")

//async is like a secret method ?
router.get("/", validateToken, async (req,res) => {
    const listOfPost = await Post.findAll({include: [Like] });
    
    const likedPosts = await Like.findAll({where: {UserId: req.user.id}})
    res.json({listOfPost: listOfPost , listOfLikedPost: likedPosts});
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Post.create(post);
    //wait for thing to insert
    res.json(post);
});

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    res.json(post)
})

module.exports = router