const dotenv = require('dotenv')
dotenv.config()

const ENV = { 
    DB_URI : 'mongodb+srv://root:CeO1X9EVcSVPxd9Y@cluster0.hoag4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
     ,
    PORT : 8000,
    DB_NAME: "Gaming"

}
module.exports = ENV