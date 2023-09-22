const express = require('express');
const router = express.Router();
const { Like } = require("../models");
const { validateToken} = require("../middleware/AuthMiddleware")

router.post("/", validateToken, async(req, res) => {
    const {PostId} = req.body;
    const UserId = req.user.id

    const found = await Like.findOne({
        where:{PostId: PostId,  UserId: UserId   }
    }) 
    //const found, to check in the Likes database, does it have any with the same PostId and UserId
    if (!found){
        await Like.create({PostId: PostId, UserId: UserId })
        res.json({liked: true})
        //if there are none, the post action will "like", create a new Like in the database with the postId and userId
        //return the liked to true
    } else {
        await Like.destroy({
            where:{PostId: PostId,  UserId: UserId   }
        })
        res.json({liked: false})
        //if there is a Like in the database, the post action will "dislike", delete the Like from the database 
        //return the liked to false
    }

    

})

module.exports = router