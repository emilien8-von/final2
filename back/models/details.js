const mongoose = require('mongoose')
const comments = require('./comments')

category = mongoose.Schema(
    {
        titre : 
        {
            type : String,
            required : true
        },
        description : {
            type: String,
            required : true
        },
        brand : {
            type : String,
        },

        genre : {
            type: String,
            enum : ["Platforme","Sports","Combats","Course","RPG"]
        },
        date_sortie : {
            type : Number,
        },
        comments:{
           type : mongoose.Schema.Types.ObjectId, ref :"Comments"
        },
        status : {
            type : Boolean,
            required : true
        },
        image:{
            type: String,
            required : true

        },
        rating:{
            type: Number,
            required : true
        }

    } ,{Timestamp : {createdAt : true} }
)

module.exports = mongoose.model("Category",category)