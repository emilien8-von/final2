const mongoose = require('mongoose')

const user = mongoose.Schema(
    {
       pseudo : {
        type : String,
        required : true,
        minLength : 3,
        maxLength: 23
       },
       email : {
        type: String,
        required : true,
        unique : true
       },

       role : 
       {
        type: String,
        enum : ["user", "admin","gadmin","consultant","moderateur","designer"],
        default : 'user'
       },
       password : 
       {
        type : String,
        minLength:3,
        required: true
        
       }                     
    } , {Timestamps : {createdAt : true}}
)

module.exports = mongoose.model('Users',user)