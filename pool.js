const mongoose = require('mongoose');
var pool = () =>{
    mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/moviesregister')
 
mongoose.connection
.once("open",() => console.log("Mongodb running"))
.on("err",(err) => console.log(err));

}
module.exports=pool
