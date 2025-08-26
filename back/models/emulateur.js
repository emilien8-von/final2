const mongoose = require('mongoose')
const emulateur = mongoose.Schema(
 {
    nom :{
       type : String,
       required : true
    },
    image:{
        type :String,
        required: true
    },
    emule: {
        type : String,
        required : true
    },
    sortie :{
        type: Date,
        required : true
    },
    existe : {
        type : Boolean,
        required : true
    }

 } ,{timestamps : {createdAt : true} }
)
module.exports = mongoose.model('Emulateur',emulateur)