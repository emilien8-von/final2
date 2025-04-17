const mail = require('nodemailer')
const ENV =  require('../config/env')

const send = mail.createTransport({
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
        user: ENV.EMAIL_USER,
        pass : ENV.EMAIL_PASS
    }
})

const envoi = async(user,verifie) =>{
    const link = `<a href = '${ENV.PORT_APPLI_FRONT}/verification /${verifie}'>${verifie}</a>`
    await send.sendMail({
        from : ENV.EMAIL_USER,
        to : user.email,
        subject : "Valider votre inscription",
        html: `<strong> Hello ${user.pseudo},\n\n Cliquer sur le lien pour le mail : ${link}</strong>`
    })
}

module.exports = envoi