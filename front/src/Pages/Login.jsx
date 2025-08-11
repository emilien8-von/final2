import React, { useState , useContext} from 'react'
import './css/Login.css'
import { Link } from 'react-router'
import { LOGIN } from '../utils/configs/Form'
import { Context } from '../utils/context/Context'
const Login = () => {

     const [sign,setSign] = useState({})
     const {login} = useContext(Context)
     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
     const handleChange = event =>{
      const {name,value} = event.target
      setSign(prevUser => ({...prevUser,[name]:value}))
     }
   const togglePasswordVisibility = () => {
      setIsPasswordVisible(prevState => !prevState);
    }
     const verification = (event) =>
    {
       if(!sign.email || !sign.password){
          alert("émail ou mot de passe  vide !")
          event.preventDefault()
    } else{
      login(sign)

    }
    }
  return (
    <div className='color'>
    <section>
      <div className='login-page-container '> 
          <div className='login-image-section'>
           
             <img src="/cosmic.png" className='image' alt="cosmo"/>
             <hr className='form-separator' />
             <p className='p'> Connecte toi pour ton <span className='span'>adventure !</span> </p>

          </div>
          <div className='login-form-section'> 
           <h1>CONNECTION </h1>
          
           
         <form onSubmit={verification} id='form' className='login-form'>
          
                 {LOGIN.map(field =>(
                          <div key={field.id}>
                             <br /> 
                            <strong> <label htmlFor={field.id}>{field.label}</label> </strong> <br/> <br />
                            <div className='login-wrapper'> 
                            <i className={`input-icon ${field.iconClass}`}></i>                             
                            <input  type={field.name === 'password' ? (isPasswordVisible ? 'text' : 'password') : field.type} name={field.name} className={field.className} id = {field.id} placeholder={field.placeholder} 
                              onChange={handleChange}/> 
                                      {field.name === 'password' && (
                                    <img 
                                       onClick={togglePasswordVisibility} 
                                       src={isPasswordVisible ? "./closed-eye.svg" : "/eye.svg"}
                                       alt="eye" 
                                       id="img" 
                                       className="input-icon eye-icon"
                                       />
                                  )}
                            </div>
                          </div>
                        ))}  <br />
                       
                <button className='button'> <strong>Valider </strong></button>
                
         </form>
          
         <p>Retourner a la page d'<Link className='link' to='/'>acceuil </Link></p>
         <p>Vous avez oublier votre mot de passe cliquer sur ce <span className='span'>lien</span></p>
         <hr className='form-separator' />
         <p>En vous connectant vous acceptez nos <span className='span' > Termes et nos Conditions</span>. </p>
        </div>
       </div>
      </section>
     
    </div>
  )
}

export default Login
