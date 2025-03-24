const Users = require('../modules/pseudo')
const bcrypt = require('bcrypt')

const Puser = async(req,res) =>{
    try{
        const passwordH = await bcrypt.hash(req.body.password,10)
        const reponse = await Users.create({
            ...req.body,
            password : passwordH
        })
        res.status(201).json('users created!',reponse)
    }
    catch(error){
        console.log(error.message);
        
    }
}

module.exports = {Puser}