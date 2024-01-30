
var mongoose = require('mongoose')
var movieDetailSchema = mongoose.Schema({

    moviename: {
        type: String,
        required: true
    },
    releasedate: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },

    stateid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "states"
    },
    cityid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "cities"
    },

    address: {
        type: String,
        required: true
    },
    cinema: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    movietype: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },

})
module.exports = mongoose.model("moviedetails", movieDetailSchema);