const express = require('express');
const router = express.Router();
const { User } = require("../models");
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');

router.post("/", async (req, res) => {
    const { username, password, displayname } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            username: username,
            password: hash,
            displayname: displayname,
        })
        res.json("Success")
    })
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } });

    if (!user) res.json({ error: "User doesnt exist" });
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) res.json({ error: "Wrong username or password (or both)" });
            else{
                const accessToken = sign({username: user.username, id: user.id, displayname: user.displayname}, "important")
                res.json(accessToken)
            }
            
        });
    }
})

module.exports = router