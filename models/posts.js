const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    titre : {
        type : String,
        required : true
    },
    contenu : {
        type : String,
        required : true
    },
    emplacement : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('posts', postSchema)