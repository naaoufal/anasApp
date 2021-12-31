const User = require('../models/users')
const jwt = require("jsonwebtoken")
const KcAdminClient = require('keycloak-admin').default
const res = require('express/lib/response')
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

// get user by email and password using json web token :
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

// init keycloak admin :
const adminClient = new KcAdminClient({
    baseUrl : 'http://localhost:8080/auth/',
    realmName : 'API'
})

// auth using keycloak :
const authKeycloak = async (req, res) => {
    try {
        await adminClient.auth({
            username: 'user',
            password: 'azer',
            grantType: 'password',
            clientId: 'test-api'
        })
        const users = await adminClient.users.find()
        res.json(users)
    } catch (error) {
        res.json({ message : error.message })
    }
}

// create new user using keycloak :
const createUserWithKeycloak = async (req, res) => {
    try {
        const newUser = await this.kcAdminClient.users.create({
            realm: 'API',
            username: req.body.username,
            email: req.body.email,
        })
        res.json(newUser)
    } catch (error) {
        res.json({ message : error.message })
    }
}


module.exports = {
    getUsers,
    postUser,
    userAuth,
    authKeycloak,
    createUserWithKeycloak
}