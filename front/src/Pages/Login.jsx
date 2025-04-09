import React, { useState , useContext} from 'react'
import './css/Login.css'
import { Link } from 'react-router'
import { LOGIN } from '../utils/configs/Form'
import { Context } from '../utils/context/Context'
const Login = () => {
     const [sign,setSign] = useState({})
     const {login} = useContext(Context)
     const handleChange = event =>{
      const {name,value} = event.target
      setSign(prevUser => ({...prevUser,[name]:value}))
   }
   const pass = () =>
    {
     const img = document.getElementById("img")
     const change =  document.getElementById("pass")
     if(change.type === "password"){
      change.type = "text"
      img.setAttribute("src","/closed-eye.svg")
     } else{
      change.type = "password"
      img.setAttribute("src","/eye.svg")
     }
  }
     const verification = (event) =>

    {
      event.preventDefault()
      login(sign)
      
    }
  return (
    <div>
       <h1 className='h1'>Login</h1>
       <form onSubmit={verification} id='form' className='form'>
                {LOGIN.map(field =>(
                          <div key={field.id}>
                
                            <label htmlFor={field.id}>{field.label}</label>
                            <input type={field.type} name={field.name} className={field.className} id = {field.id} placeholder={field.placeholder}
                             onChange={handleChange} 
                            />
                          </div>
                        ))}
                           <span> <img onClick={pass} src="/eye.svg" alt="eye" id='img' className='img'/></span>
         <button type="submit">Valider</button>
       </form>
       <p>Retour a la page d'acceuil <Link className='link' to='/'>acceuil </Link></p>
    </div>
  )
}

export default Login
