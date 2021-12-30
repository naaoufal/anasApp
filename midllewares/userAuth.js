require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = function auth (req, res, next) {
    const autHeader = req.headers['authorization']
    const token = autHeader && autHeader.split(' ')[1]
  
    if(token == null){
        return res.sendStatus(403)
    }
  
    const code = jwt.verify(token, process.env.ACCESS_TOKEN)
    const user = User.findById(code.id)

    if(!user){
        return res.sendStatus(404)
    }
    req.user = user
    next()
}