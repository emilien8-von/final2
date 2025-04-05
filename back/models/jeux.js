const mongoose = require('mongoose')


const jeux = mongoose.Schema(
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
            required : true
        },
        franchise : {
            type : String,
            required : true
        },
        genre : {
            type: String,
            enum : ["Platforme","Sports","Combats","Course","RPG","open world","beat them all","action"]
        },
        annee_sortie : {
            type : Number,
            required : true
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
            required : true,
            maxlength : 5
        },
        exclusivite : {
            type : Boolean,
            required :  true
        }

    } ,{Timestamp : {createdAt : true} }
)

module.exports = mongoose.model("Jeux",jeux)