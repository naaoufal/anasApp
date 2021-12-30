const User = require('../models/users')
const jwt = require("jsonwebtoken")
require('dotenv').config()

// get all users :
const getUsers = async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (error) {
        res.json({ message : error.message })
    }
}

// post a new user :
const postUser = async (req, res) => {
    const user = new User({
        email : req.body.email,
        password : req.body.password
    })

    try {
        const newUser = await user.save()
        res.json(newUser)
    } catch (error) {
        res.json({ message : error.messages })
    }
}

// get user by email and password :
const userAuth = async (req, res, next) => {

    const { email, password } = req.body
    User.findOne({
        email : email,
        password : password
    }).then(user => {
        if(!user) {
            res.json({ message : "You re not Allowed !!!" })
        } else {
            const email = req.body.email
            const password = req.body.password
            const us = {
                usemail : email,
                uspassword : password
            }
            const accessToken = jwt.sign(us, process.env.ACCESS_TOKEN)
            res.json({ accessToken })
            res.us = us
            next()
        }
    })

}


module.exports = {
    getUsers,
    postUser,
    userAuth
}