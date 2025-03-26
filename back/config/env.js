const dotenv = require('dotenv')
dotenv.config()

const ENV = { 
    DB_URI :process.env.DB_URI,
    PORT : 8000,
    DB_NAME: "Gaming"

}
module.exports = ENV