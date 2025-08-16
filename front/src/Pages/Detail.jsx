import React, { useEffect , useState} from 'react'
import './css/detail.scss'
import { Link, useNavigate, useParams } from 'react-router'
import axios from 'axios'
import Comments from './Comments'
const Detail = () => {
    const param = useParams()
    const {id} = param
    //const navigate = useNavigate()
    const [details , setDetails] = useState(undefined)

    useEffect(() => {
        console.log(id);
         const fetchdetail = async() => {
            
            
            try{
                const {data,status} = await axios.get(`http://localhost:8000/game/jeux/get/${id}`)
                console.log(data);
                
                if(status === 200) setDetails(data)
            } 
        catch(error){
            console.log(error.message);
        }
         }
         fetchdetail()
    },[])
   
    const popup =()=>{
      const star = document.getElementById("star")
      alert("tu as cliqué")
    }
  return (
    details === undefined ? <></> :
    <div className='body'>
        
         { 
            <> 
         
       <h1>{details.titre}</h1>
       <p> Retourner à la page d'<Link className='link' to='/'>acceuil</Link> ?</p>
       <div><img className='d-image' src={`${details.image}`}alt="va" /> </div> 
       <div className='line'></div> 
        <h2>Description</h2>
        <p>{details.description}</p>
       <div className='line'></div>
       <h2>Caracteristique</h2>
       <table>
         <tbody className='tab'> 
           <tr>
            <td> Developpeur</td>
            <td className='tdd'>{details.brand}</td>
           </tr>

           <tr>
            <td> Franchise</td>
            <td className='tdd'>{details.franchise}</td>
           </tr>

            <tr>
            <td> Date de sortie </td>
            <td className='tdd'>{details.annee_sortie}</td>
           </tr>

           <tr>
            <td> Genre </td>
            <td className='tdd'>{details.genre}</td>
           </tr>
           <tr>
            <td> Exclsivité </td>
            <td className='tdd'>{details.exclusivite}</td>
           </tr>
           <tr>
            <td> Disponible </td>
            <td className='tdd'>{details.disponible}</td>
           </tr>
           <tr>
            <td> emulateur </td>
            <td className='tdd'>{details.emulateur}</td>
           </tr><tr>
            <td> Mode multijoueur </td>
            <td className='tdd'>{details.multijoueur}</td>
           </tr>
           <tr>
            <td> Nombre de joueur max </td>
            <td className='tdd'>{details.nombre_de_joueur}</td>
           </tr>
           <tr>
            <td> Mode online </td>
            <td className='tdd'>{details.online}</td>
           </tr>
           <tr>
            <td> En vente ? </td>
            <td className='tdd'>{details.status}</td>
           </tr>
          </tbody>
       </table>
       <div className='line'></div>
       <h2>Gallery</h2>
       <div className='gallery'> 
         
            <img className='gal' src= { `${details.gallery.img2}` } alt="img"/>
            <img className='gal' src= { `${details.gallery.img3}` } alt="img"/>
            <img className='gal' src= { `${details.gallery.img4}` } alt="img"/>
            <img className='gal' src= { `${details.gallery.img5}` } alt="img"/>
            <img className='gal' src= { `${details.gallery.img6}` } alt="img"/>
       
       </div>
        <div className='line'></div>
       <h2>Note et comment</h2>  
        <img 
  src={ `${details.avatar}`}// Le '?' vérifie si 'auth' existe avant d'essayer de lire 'avatar'
  alt="Avatar de l'utilisateur" 
  className="user-avatar" 
  referrerPolicy="no-referrer" 
/>
         
         
              </>
         }
    </div>
  )
}

export default Detail
