const Post = require('../models/posts')
const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
    host : 'localhost:9200'
})
require('dotenv').config()

// get all posts :
const getPost = async (req, res) => {
    try {
        // get data from mongodb :
        const post = await Post.find()
        res.json(post)
    } catch (error) {
        res.json({ message : error.message })
    }
}

// get posts with elastic search :
const getElasticSearch = async (req, res) => {
    try {
        // get data with elastic search :
        let posts
        client.get({
            index : 'posts',
            type : 'anytype',
            id : req.params.id
        }, function (error, response, status) {
            if(error) {
                console.log(error)
            } else {
                posts = response._source
                res.json(posts)
                if(!posts) {
                    res.json({ message : "No posts Found !!!" })
                }
            }
        })
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
        // saving data to database (mongoDB) :
        const newPost = await post.save()

        // indexing data with elsatic Search :
        client.index({
            index : 'posts',
            type : 'anytype',
            id : req.body.id,
            body : req.body
        }, function (error, response, status) {
            if(error) {
                console.log(error)
            } else {
                return res.json({ message : "Posts Indexed !!!" })
            }
        })

        // res.json(newPost)
        
    } catch (error) {
        res.json({ message : error.message })
    }
}

module.exports = {
    getPost,
    getElasticSearch,
    addPost
}