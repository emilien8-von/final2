const mongoose = require('mongoose')
const avis = mongoose.Schema( 
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
         message : {
            type:String,
            required: true
         },
         role : {
            type : String,
            enum : ["user","admin","gadmin","consultant","designer"],
            required : true
         } ,
         date : {
            type: Date,
            required : true
         },
         like : {
            type : Number,
         }


    },
    {timestamps: { createdAt: true } }
)

module.exports = mongoose.model('Avis',avis)