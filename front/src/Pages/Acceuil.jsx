import React from 'react'
//CSS
import './css/Acceuil.css'
import './css/mobile.css'
import './css/tablette.css'
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
  return (
    <div className='nain'>
        <div className='bord'>
           <h1 className='h1'>On attaque?! Alors ça va chauffer!!</h1>
           <p className='p1'>“Je me suis rendu compte que les jeux ne sont pas qu'une distraction.
               Les jeux peuvent susciter des émotions.”</p>
               <p className='p'>-Sid Meier</p>
        </div>
        <h2 onMouseOver={color} className='h2' id='h2'>Level up!</h2>
        <section>
          <div className='t-flex' >
             <img className='img5' src="/start.png" alt="m" />
             <img onMouseOver={img} src="/easy.png" id='img5' alt="l" width={120} />
            <img src="/level.jpeg" alt="n" className='img5'/> 
         </div>
        </section>
        <h3>Les differents type de jeux</h3>
        <p>Les jeux de types plateformes sont les plus connues et qui ont permis de donner des jeux comme (Mario , Sonic,Crash bandicoot , ect..)</p>
        <section>
          <div className='v-flex'> 
           <img   className='img1'  src="/mario.jpg" alt="v" />
           <img  className='img2' src="/crash.jpg" alt="b" />
           <img className='img3' src="/shadow.jpg" alt="d" />
          </div>
        
        
         <p>Les jeux de course sont aussi un type de jeu qui est tout à fait une source de divertissement et de nostalgie. Maintenant en piste !</p>
         
          <div className='v-flex'> 
           <img src="/kart.jpg" alt="a" className=' img1 '/>
           <img src="/nitro.jpg" alt="c" className='img2' />
           <img src="/turismo.jpg" alt="j" className='img3' />
          </div>
         
         <p>Montrer votre adréaline et determination grâce au combat qui vous font repousser vos limites et vos envies , tous sur le ring!</p>
          
            <div className='v-flex'> 
              <img src="/smash.jpg" alt="x" className='img1  img13'/>
              <img src="/fighter.jpg" alt="q"  className='img2'/>
              <img src="/ball.jpg" alt="i" className='img3'/>
            </div>
          
          <p>Quoi de mieux pour bon divertissement familiale ou amicale avec le jeux de sport .Bien qu’on peut rencontrer quelque de tension , au final ce qu’on retiendra c’est une super soirée !  </p>
          
             <div className='v-flex'>
             <img src="/olympic.jpg" alt="g" className='img1 '/>
               <img src="/fifa.jpg" alt="u" className='img2 ' />
               <img src="/basket.jpg" alt="z" className='img3' />
               
             </div>
          </section>     
        <div className='ligne'></div>
        <div className='ligne2'></div>
        <h2 className='h2'>Les consoles et leurs emulateurs</h2>
        <h3 className='N1'>Les consoles Nintendo</h3>
        <p>La marque Nintendo est une des marque de jeux le plus poulaire au monde , avec des consoles qui varie du salon familiale jusqu’a la version portable.</p>
        <section>
           <div className='v-flex'>
           <img className='img1 ' src="switch.jpg" alt="s"   />
           <img className=' img1 ' src="wii3.jpg" alt="t" />
           <img className=' img1 '  src="/DS.jpg" alt="r" />
           </div>
        </section> 
         <section> 
           <h3 className='P1'>Les consoles Playstations</h3>
           <p>Les consoles playstations sont  les consoles les plus apprecies et c’est normal , avec une super gamme de jeux qui ont marque leur generation de la ps1 jusqu’a aujourd’hui.</p>
          <div className='v-flex'>
             <img className='img2' src="/play.jpg" alt="i"  width={150}/>
             <img className='img2'  src="/ps5.jpg" alt="i" width={150}/>
             <img className='img2'  src="/psp.jpg" alt="i" width={150}/>
          </div> 
        </section>
        <h3 className='X1'>Les consoles Xbox</h3>
        <p>Plongez dans l'univers du gaming avec la Xbox : une puissance de jeu inégalée, des exclusivités captivantes et une expérience immersive à couper le souffle !</p>
        <section>
          <div className='v-flex'>
            <img className='img3'  src="/360.jpg" alt="k" width={150}/>
            <img className='img3' src="/one.jpg" alt="h"  width={150} />
            <img className='img3' src="/xbox2.avif" alt="h"  width={150} />
          </div>
        </section>
        <h3 className='G1'>Le PC</h3>
        <p>
          Comme on peut s’attendre le PC est devenu un outil important dans le monde 
            du gaming ,ce qui va mettre au fur et à mesure remplace les consoles .
        </p>
        <section>
          <div className='v-flex'>
          <img  className='img4' src="/pc.jpg" alt="h" width={150} />  
          <img className='img4'  src="/gamer.jpg" alt="h" width={150} />
          </div>
        </section>
    </div>
  )
}

export default Acceuil