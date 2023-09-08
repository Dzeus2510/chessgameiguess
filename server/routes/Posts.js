const express = require('express');
const router = express.Router();
const { Post } = require("../models");

//async is like a secret method ?
router.get("/", async (req,res) => {
    const listOfPost = await Post.findAll();
    res.json(listOfPost);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Post.create(post);
    //wait for thing to insert
    res.json(post);
});

module.exports = router