
var mongoose=require('mongoose')
var stateSchema=mongoose.Schema({
statename:{type:String,
required:true}

})
module.exports = mongoose.model("state", stateSchema);