
const mongoose = require('mongoose')

const category = mongoose.Schema({
     console: {
        type : String,
        require : true
     }
    
        
} ,{Timestamp : {createdAt : true} }

)

module.exports = mongoose.Model('Category',category)