const mongoose = require('mongoose')
const avis = mongoose.Schema( 
    {
        pseudo : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Users',
            //required : true
        },
        rating:{
            type : Number,
            //required : true
        },
         message : {
            type:String,
            required: true
         },
         role : {
            type : String,
            enum : ["user","admin","gadmin","consultant","designer"],
            required : true,
            default : "user",
         } ,
         date : {
            type: Date,
            //required : true
         },
         content: { type: String, required: true },
         rating: { 
            type: Number, 
            min: 0, 
            max: 5,
            default: 0 
         },
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
          game: { type: mongoose.Schema.Types.ObjectId, ref: 'Jeux', required: true }



    },
    {timestamps: { createdAt: true } }
)

module.exports = mongoose.model('Avis',avis)