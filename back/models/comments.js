const mongoose = require('mongoose')
const comment = mongoose.Schema( 
    {
        pseudo : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Users',
            required : true
        },
        rating:{
            type : Number,
            required : true
        },
         commentaire : {
            type:String,
            required: true
         },
         role : {
            type : String,
            enum : ["user","admin","gadmin","consultant","designer"],
            required : true
         }


    },
    {timestamps: { createdAt: true } }
)

module.exports = mongoose.model('Comments',comment)