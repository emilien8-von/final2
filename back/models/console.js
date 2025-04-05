
const mongoose = require('mongoose')

const console = mongoose.Schema({
     nom: {
        type : String,
        require : true
     },
     brand :{
          type : String,
          require : true
     } ,
     sortie : 
     {
         type : Date,
         require : true
     },
     emulable : {
          type : Boolean,
          require : true
     }
        
} ,{Timestamp : {createdAt : true} }

)

module.exports = mongoose.model('Console',console)