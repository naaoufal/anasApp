const Comment = require('../models/comments')
require('dotenv').config()

// get all comment to a specific post :
const getComments = async (req, res) => {
    try {
        const id = req.params.id
        const comment = await Comment.find()
        const filtred = []
        comment.map((element) => {
            if(element.postID == id) {
                filtred.push(element)
            }
        })
        res.json(filtred)
    } catch (error) {
        res.json({ message : error.message })
    }
}

// add new comment to a specefic post :
const addComment = async (req, res) => {
    const comment = new Comment({
        userID : req.body.userID,
        comment : req.body.comment,
        postID : req.body.postID
    })

    try {
        const newComment = await comment.save()
        res.json(newComment)
    } catch (error) {
        res.json({ message : error.message })
    }
}

module.exports = {
    getComments,
    addComment
}