const express = require('express');
const router = express.Router();
const { Post } = require("../models");

router.get("/", (req,res) => {
    res.json("Hee Hee");
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Post.create(post);
    //wait for thing to insert
    res.json(post);
});

module.exports = router