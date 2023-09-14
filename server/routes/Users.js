const express = require('express');
const router = express.Router();
const { User } = require("../models");
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middleware/AuthMiddleware')

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
            else {
                const accessToken = sign({ username: user.username, id: user.id, displayname: user.displayname }, "important")
                res.json({ token: accessToken, username: user.username, displayname: user.displayname, id: user.id })
            }

        });
    }
})

router.get('/auth', validateToken, async (res, req) => {
    req.json(res.user)
})

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id

    const basicInfo = await User.findByPk(id, { attributes: { exclude: ["password", "updatedAt"] } })

    res.json(basicInfo)
})

router.put('/changepassword', validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findOne({ where: { username: req.user.username } });

    bcrypt.compare(oldPassword, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Old Password" });
       
        bcrypt.hash(newPassword, 10).then((hash) => {
            User.update({password: hash},{where: { username: req.user.username }})
            res.json("Success Changed password")
        })
    });
})

module.exports = router