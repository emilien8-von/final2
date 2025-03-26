const app = require('./app')
const ENV = require('./config/env')
const PORT = 8000 || ENV.PORT

app.listen(PORT,() =>{

    console.log(`connecté au port: ${PORT}`);
    
})