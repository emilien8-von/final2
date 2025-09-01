const app = require('./app')
const ENV = require('./config/env')
const PORT = ENV.PORT || 8000

app.listen(PORT,() =>{

    console.log(`connecté au port: ${PORT}`);
    
})