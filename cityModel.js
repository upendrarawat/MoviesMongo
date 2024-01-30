
var mongoose=require('mongoose')
var citySchema=mongoose.Schema({
cityname:{type:String,
required:true},
stateid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"states"
}

})
module.exports = mongoose.model("city", citySchema);