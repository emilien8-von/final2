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
        enum : ["user", "admin"],
        default : 'user'
       },
       password : 
       {
        type : String,
        minLength : 3,
        required : true
        
       } ,
       avatar :
       {
        type : String,
        default : "https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
       } ,  
       passwordResetCode: {
        type: String,
        default: null
       },
       passwordResetExpires: {
        type: Date,
        default: null
      },
      isActif:{
        type:Boolean,
        default:false
      },
       isVerified : {
        type : Boolean,
        default : false
       },
    }    , {Timestamps : {createdAt : true}}
    )

module.exports = mongoose.model('Users',user)