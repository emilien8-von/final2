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
        required : true,
        minLength : 3
       } ,
       avatar :
       {
        type : String,
        default : "https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
       } , 
       online  : 
       {
           type :Boolean,
           required : true,
        } ,
        multijouer :
        {
            type : Boolean,
            required : true
        },
        nombre_de_joueur : {
           type : Number,
           requiered : true
        }
    }    , {Timestamps : {createdAt : true}}
    )

module.exports = mongoose.model('Users',user)