const dotenv = require('dotenv')
dotenv.config()

const ENV = { 
    DB_URI :process.env.DB_URI,
    PORT : 8000,
    DB_NAME: "Gaming",
    TOKEN : process.env.TOKEN

}
module.exports = ENV