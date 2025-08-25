import React, { useContext, useEffect, useState } from 'react'
//CSS
import './css/Acceuil.css'
import './css/mobile.css'
import './css/tablette.css'
import { Link } from 'react-router'
import { Context } from '../utils/context/Context'
import URLS from '../utils/constants/URLS'
import INSTANCE from '../utils/services/instance'
const Acceuil = () => {
  const color =()=>
  { 
    let t = []
    for(let i =0;i<3;i++){
      let m = Math.floor(Math.random()*256) 
      t.push(m)
    }
     let ray = t.join(",")
     let valeur = `rgb(${ray})`
     document.getElementById("h2").style.color = valeur
  }
  const [detail, setDetail] = useState([])
  const {auth} = useContext(Context)
  useEffect(() =>{
    const fetchdetail = async() =>{
      try{
          const {data , status} = await INSTANCE.get(`${URLS.GET_ALL_GAMES}`)

          if(status === 200) setDetail(data)
            console.log(data);
            
      }
      catch(error){
        console.log(error.message);
        
      }
    }
     fetchdetail()
     console.log(detail);
  },[])

  const [article, setArticle] = useState([])
  
  useEffect(() =>{
    const fetcharticle = async() =>{
      try{
          const {data , status} = await INSTANCE.get(`${URLS.GET_ALL_CONSOLE}`)

          if(status === 200) setArticle(data)
            console.log(data);
            
      }
      catch(error){
        console.log(error.message);
        
      }
    }
     fetcharticle()
     console.log(detail);
  },[])
  

  const img = ()=>
    {
     const img5 = document.getElementById("img5")
    
     let img = img5.getAttribute("src")
     if(img === "/easy.png")
     {
      img5.setAttribute("src","/meduim.png")  
     } else if(img === "/meduim.png"){
      img5.setAttribute("src","/hard.png")
     } else{
      img5.setAttribute("src","/easy.png")
     }
    }
  const acces = ()=>
  {
     alert("Pour consulter le jeu veuillez vous inscrire ou vous connecter !")
  }
   


  return (
  <div className='nain'>
        <div className='bord'>
           <h1 className='h1'>On attaque?! Alors ça va chauffer!!</h1>
           <p className='p1'>“Je me suis rendu compte que les jeux ne sont pas qu'une distraction.
               Les jeux peuvent susciter des émotions.”</p>
               <p className='p'>-Sid Meier</p>
        </div>
        <h2 onMouseOver={color} className='level' id='h2'>Level up!</h2>
        <section>
          <div className='t-flex' >
            <img className='img5' src="/start.png" alt="m" />
              
             <img onMouseOver={img} src="/easy.png" id='img5' alt="l" width={120} />

            <img src="/level.jpeg" alt="n" className='img5'/> 
         </div>
        </section>
        <h3>Les differents type de jeux</h3>
       
        <section>
          {auth?
          
             <div className='section-vignette image-grid game-grid'> 
               {detail.map(info => (
                 <div key={info._id} className='grid-card'>
                   <Link to={{ pathname: `/detail/${info._id}` }}> 
                     <img src={`${info.image}`} className='img7' alt="v" />
                   </Link> 
                 </div>
           ))}
              </div>

          : <div>
              <p>
                 Les jeux de types plateformes sont les plus connues et qui ont permis de donner des jeux comme 
                 (Mario , Sonic,Crash bandicoot , ect..)
              </p>
              <div className='v-flex'> 
                  <img onClick={acces}   className='img1'  src="/mario.jpg" alt="v" />
                  <img onClick={acces}  className='img2' src="/crash.jpg" alt="b" />
                  <img onClick={acces} className='img3' src="/shadow.jpg" alt="d" />
              </div>
        
                <p>Les jeux de course sont aussi un type de jeu qui est tout à fait une source de divertissement et de nostalgie. Maintenant en piste !</p>
         
          <div className='v-flex'> 
           <img onClick={acces} src="/kart.jpg" alt="a" className=' img1 '/>
           <img onClick={acces} src="/nitro.jpg" alt="c" className='img2' />
           <img  onClick={acces} src="/turismo.jpg" alt="j" className='img3' />
          </div>
         
         <p>Montrer votre adréaline et determination grâce au combat qui vous font repousser vos limites et vos envies , tous sur le ring!</p>
          
            <div className='v-flex'> 
              <img onClick={acces} src="/smash.jpg" alt="x" className='img1  img13'/>
              <img onClick={acces} src="/fighter.jpg" alt="q"  className='img2'/>
              <img onClick={acces} src="/ball.jpg" alt="i" className='img3'/>
            </div>
          
          <p>Quoi de mieux pour bon divertissement familiale ou amicale avec le jeux de sport .Bien qu’on peut rencontrer quelque de tension , au final ce qu’on retiendra c’est une super soirée !  </p>
          
             <div className='v-flex'>
             <img onClick={acces} src="/olympic.jpg" alt="g" className='img1 '/>
               <img onClick={acces} src="/fifa.jpg" alt="u" className='img2 ' />
               <img onClick={acces} src="/basket.jpg" alt="z" className='img3' />
               
             </div>
          <p>Quoi de mieux qu'un bon RPG , Pour un site jeu vidéo.</p>
             <div className='v-flex'>
           <img onClick={acces} className='img1 ' src="/pokemon.jpg" alt="s"   />
           <img onClick={acces} className=' img2 ' src="/dragon.jpg" alt="t" />
           <img onClick={acces} className=' img3 '  src="/fantasy.jpg" alt="r" />
           </div>
          </div>
        } 
        
        
        </section>     
            
  
     <div>

          <h2 className='h2'>Les consoles et leurs émulateurs</h2>
        { auth ?
              
<div className='image-grid console-grid'>
  {article.map(info => (
    <div key={info._id} className="image-card">
      <Link to={{ pathname: `/histoire/${info._id}` }}> 
        <img src={`${info.image}`} alt="Console" />
      </Link> 
    </div>
  ))}
</div>

    
          :
          <div> 
          <h3 className='N1'>Les consoles Nintendo</h3>
          <p>La marque Nintendo est une des marque de jeux le plus poulaire au monde , avec des consoles qui varie du salon familiale jusqu’a la version portable.</p>
          <div className='items-row nintendo-section nintendo'> 
        <div className='item-card'> 
            <img onClick={acces} src="/switch.jpg" alt="Nintendo Switch" />
        </div>
        <div className='item-card'> 
            <img onClick={acces} src="/wii3.jpg" alt="Nintendo Wii" />
        </div>
        <div className='item-card'> 
            <img onClick={acces} src="/DS.jpg" alt="Nintendo 3DS" />
        </div>
          </div>

          <h3 className='P1'>Les consoles Playstations</h3>
          <p>Les consoles playstations sont les consoles les plus apprecies et c’est normal , avec une super gamme de jeux qui ont marque leur generation de la ps1 jusqu’a aujourd’hui.</p>
          <div className='items-row playstation-section sony'>
              <div className='item-card'>
                  <img onClick={acces} src="/play.jpg" alt="PlayStation 4" />
              </div>
              <div className='item-card'>
                  <img onClick={acces} src="/ps5.jpg" alt="PlayStation 5" />
              </div>
              <div className='item-card'>
                  <img onClick={acces} src="/psp.jpg" alt="PlayStation Portable" />
              </div>
          </div>
      
          <h3 className='X1'>Les consoles Xbox</h3>
          <p>Plongez dans l'univers du gaming avec la Xbox : une puissance de jeu inégalée, des exclusivités captivantes et une expérience immersive à couper le souffle !</p>
          <div className='items-row xbox-section xbox'>
              <div className='item-card'>
                  <img onClick={acces} src="/360.jpg" alt="Xbox 360" />
              </div>
              <div className='item-card'>
                  <img onClick={acces} src="/one.jpg" alt="Xbox One" />
              </div>
              <div className='item-card'>
                  <img onClick={acces} src="/xbox2.avif" alt="Xbox Series X" />
              </div>
          </div>
      
  
          <h3 className='G1'>Le PC</h3>
          <p>Comme on peut s’attendre le PC est devenu un outil important dans le monde du gaming ,ce qui va mettre au fur et à mesure remplace les consoles .</p>
          <div className='items-row pc-section pc'>
        <div className='item-card'>
            <img onClick={acces} src="/pc.jpg" alt="PC de bureau gamer" />
        </div>
        <div className='item-card'>
            <img onClick={acces} src="/gamer.jpg" alt="PC portable gamer" />
        </div>
          </div>
         </div>
        }

     </div>
  </div>
 )
}

export default Acceuil