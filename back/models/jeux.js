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
            type : String,
            enum : ["oui", "non"],
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
            type : String,
             enum : ["oui", "non"],
            required :  true
        },
        online  : 
        {
            type :String,
             enum : ["oui", "non"],
            required : true,
         } ,
         multijoueur :
         {
             type : String,
              enum : ["oui", "non"],
             required : true
         },
         nombre_de_joueur : {
            type : Number,
            requiered : true
         },
         disponible : {
            type : String,
            required:true
         },
         emulateur : {
            type : String,
            requiered : true
         }
         ,
        gallery:{
        img : {type : String},
        img2 : {type : String},
        img3 : {type: String},
        img4 : {type: String},
        img5 : {type: String},
        img6 : {type: String},
    }


    } ,{
        timestamps : true,
        toJSON: {virtuals : true},
        toObject : {virtuals : true}
         
       }
)

jeux.virtual('gallerie',{
    ref :"Gallery",
    localField : '_id',
    foreignField : "jeux"
})

module.exports = mongoose.model("Jeux",jeux)