const mongoose = require('mongoose')
const emulateur = mongoose.Schema(
 {
    nom :{
       type : String,
       require : true
    },
    image:{
        type :String,
        require: true
    },
    emule: {
        type : String,
        require : true
    },
    sortie :{
        type: Date,
        required : true
    },
    existe : {
        type : Boolean,
        require : true
    }

 } ,{Timestamp : {createdAt : true} }
)
module.exports = mongoose.model('Emulateur',emulateur)