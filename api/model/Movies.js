const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    user:{
        type:String
    },
    movie_id: {type : Array , "default" : [] }
});

module.exports = mongoose.model('Movies', movieSchema);