var mongoose = require('mongoose')
var adminSchema = mongoose.Schema({
    adminname: { type: String, required: true },
    emailid: { type: String, required: true },
    mobileno: { type: String, required: true },
    password: { type: String, required: true },
    poster:{ type: String, required: true },
})
module.exports = mongoose.model('admins', adminSchema)
