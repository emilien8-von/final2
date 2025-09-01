
const mongoose = require('mongoose')

const console = mongoose.Schema({
     nom: {
        type : String,
        required : true
     },
     brand :{
          type : String,
          required : true
     } ,
     sortie : 
     {
         type : Date,
         required : true
     },
     emulable : 
     {
          type : Boolean,
          required : true
     },
     emulateur : {
          type : String,
          required : true
     },
     image : 
     {
          type : String,
          required : true
     },
     vente : {
          type : Boolean,
          required : true
     }
        
} ,{timestamps : {createdAt : true} }

)

module.exports = mongoose.model('Console',console)