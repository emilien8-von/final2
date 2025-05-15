const mongoose =  require('mongoose')

const gallery = mongoose.Schema( 
  {
    
    image:{
        img : {type : String},
        img2 : {type : String},
        img3 : {type: String},
        img4 : {type: String},
        img5 : {type: String},
        img6 : {type: String},
    }

  } ,{Timestamp : {createdAt : true} }
)

module.exports = mongoose.model('Gallery',gallery)