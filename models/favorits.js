const mongoose = require('mongoose')

const favoritSchema = new mongoose.Schema({

    userID : {
        type : String,
        required : true
    },
    postID : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('favorits', favoritSchema)