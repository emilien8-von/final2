const dotenv = require('dotenv')
dotenv.config()

const ENV = { 
    DB_URI :process.env.DB_URI,
    PORT : 8000,
    PORT_APPLI_FRONT: process.env.PORT_APPLI_FRONT,
    DB_NAME: "Gaming",
    TOKEN : process.env.TOKEN,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
}
module.exports = ENV