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
    <div className='color'>
       
      <section>
        <div className='y-flex'>
          <div className='x-flex'>
           
             <img src="/cosmic.png" className='image' alt="cosmo"/>
             <p className='p'> Connecte toi pour ton <span className='span'>adventure !</span> </p>

          </div>
          <div className='l-flex'> 
           <h1>CONNECTION </h1>
          
           
         <form onSubmit={verification} id='form' className='form'>
                {LOGIN.map(field =>(
                          <div key={field.id}>
                             <br /> 
                            <strong> <label htmlFor={field.id}>{field.label}</label> </strong> <br/> <br />
                            <input type={field.type} name={field.name} className={field.className} id = {field.id} placeholder={field.placeholder} 
                             onChange={handleChange} 
                            /> <br />
                          </div>
                        ))} <br />  <br />
                     {/**   <div className='courrier'><i class="fa-solid fa-envelope"></i></div>
                        <div className='lock'> <i id='lock' class="fa-solid fa-lock"></i></div>
                           <span> <img onClick={pass} src="/eye.svg" alt="eye" id='img' className='img'/></span> */} 
                <button className='button'> <strong>Valider </strong></button>
                
         </form>
          
         <p>Retourner a la page d'<Link className='link' to='/'>acceuil </Link></p>
         <div className='line'></div>
         <p>En vous connectant vous acceptez nos Termes et nos Conditions. </p>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Login
