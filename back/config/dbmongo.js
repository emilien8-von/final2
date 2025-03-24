const mongoose = require('mongoose') 

const mongo = (mongoURI,dbname) =>  {
    mongoose
  .connect(mongoURI, {DB_NAME : dbname }) 
  .then(() => console.log('connection reussi!'))
  .catch(error => console.log(error.message)
  )
}

module.exports = mongo