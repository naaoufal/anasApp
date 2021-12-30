const Post = require('../models/posts')
require('dotenv').config()

// get all posts :
const getPost = async (req, res) => {
    try {
        const post = await Post.find()
        res.json(post)
    } catch (error) {
        res.json({ message : error.message })
    }
}

// add new post :
const addPost = async (req, res) => {
    const post = new Post({
        titre : req.body.titre,
        contenu : req.body.contenu,
        emplacement : req.body.emplacement
    })

    try {
        const newPost = await post.save()
        res.json(newPost)
    } catch (error) {
        res.json({ message : error.message })
    }
}

module.exports = {
    getPost,
    addPost
}