const mongoose = require('mongoose') 

const mongo = (mongoURI) =>  {
    mongoose
  .connect(mongoURI) 
  .then(() => console.log('connection reussi!'))
  .catch(error => console.log(error.message)
  )
}

module.exports = mongo