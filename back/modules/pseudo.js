const mongoose = require('mongoose')

const user = mongoose.Schema(
    {
       pseudo : {
        type : String,
        required : true,
        minLength : 1
       },
       email : {
        type: String,
        required : true,
        unique : true
       },
       role : 
       {
        type: String,
        enum : ["user", "admin"],
        default : 'user'
       },
       password : 
       {
        type : String,
        minLength : 3,
        require : true
       }
    } , {Timestamps : {createdAt : true}}
)

module.exports = mongoose.model('Users',user)