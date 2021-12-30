const Favorit = require('../models/favorits')
const Post = require('../models/posts')
require('dotenv').config()

// get list of favorits by user ID :
const getFavoritsByID = async (req, res) => {
    const id = req.params.id
    let filtredFavorits = []
    const favorits = await Favorit.find()

    favorits.map((element) => {
        if(element.userID == id) {
            filtredFavorits.push(element)
        } else {
            return res.json({ message : "No Record Found !!!" })
        }
    })
    
    // filter data to get post :
    const post = await Post.find()
    const list = []
    // res.json(filtredFavorits)
    filtredFavorits.map((fil) => {
        // console.log(sub.postID)
        post.map((data) => {
            if(data._id == fil.postID) {
                list.push(data)
            }
        })
    })

    // return filtred data :
    res.json(list)
}

// add new favorit to the list :
const addFavorit = async (req, res) => {
    const favorit = new Favorit({
        userID : req.body.userID,
        postID : req.body.postID
    })

    try {
        const data = await Favorit.find()
        data.map(async (element) => {
            if(element.userID == req.body.userID && element.postID == req.body.postID) {
                res.json({ message : "Already in Favorits" })
            } else {
                const newFavorit = await favorit.save()
                res.json(newFavorit)
            }
        })
    } catch (error) {
        res.json({ message : error.message })
    }
}

module.exports = {
    getFavoritsByID,
    addFavorit
}