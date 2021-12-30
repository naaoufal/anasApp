const express = require("express")
const router = express.Router()
const postController = require("../controllers/posts")

// midlle ware that make apis acces just for user that are already susbscribe :
const access = require("../midllewares/userAuth")

// apis :

router.get("/getPosts", access, postController.getPost)

router.post("/createPost", access, postController.addPost)

module.exports = router