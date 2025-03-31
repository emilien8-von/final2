const mongoose =  require('mongoose')

const gallery = mongoose.Schema( 
  {
    image:{
        img : {type : String},
        img2 : {type : String},
        img3 : {type: String},
        img4 : {type: String},
    }

  } ,{Timestamp : {createdAt : true} }
)

module.exports = gallery