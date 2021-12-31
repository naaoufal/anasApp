const express = require("express")
const router = express.Router()
const commentController = require('../controllers/comments')

// midlle ware that make apis acces just for user that are already susbscribe :
const access = require("../midllewares/userAuth")

// apis :

router.get("/getComments/:id", access, commentController.getComments)

router.post("/addComment", access, commentController.addComment)

module.exports = router