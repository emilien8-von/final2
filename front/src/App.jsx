import React from 'react'
import { Route,Routes } from 'react-router'
import { Axios } from 'axios'
/**Components */
import Layout from './Components/Layout'
import Template from './Components/Admin/template/Template'
/**Pages */
import Acceuil from './Pages/Acceuil'
import Formulaire from './Pages/Formulaire'
import Login from './Pages/Login'
import Detail from './Pages/Detail'
import Profil from './Pages/profil/Profil'
import Forget from './Pages/password/Forget'
import Reset from './Pages/password/Reset'
import Histoire from './Pages/Histoire'
import Game from './Pages/Game'
import Console from './Pages/Console'
import Emulator from './Pages/Emulator'
import Dtailemulateur from './Pages/Dtailemulateur'
//SErvice
import Private from './utils/helpers/Private'
import Public from './utils/helpers/Public'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        {/* --- Routes Publiques (accessibles à tous) --- */}
        <Route index element={<Acceuil/>}/>
        <Route path='/formulaire' element={<Formulaire/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/mot-de-passe-oublie' element={<Forget/>}/> 
        <Route path='/reset-password/:token' element={<Reset/>}/>  

        {/* --- Routes Protégées (nécessitent d'être connecté) --- */}
        <Route element={<Private />}>
          <Route path='/detail/:id' element={<Detail/>} />
          <Route path='/parametre' element={<Profil/>}/>
          <Route path='/histoire/:id' element={<Histoire/>} />
          <Route path='/emulation/:id' element={<Dtailemulateur/>} />
          <Route path='/list-game' element={<Game/>}/>
          <Route path='/list-console' element={<Console/>}/>
          <Route path='/list-emulateur' element={<Emulator/>}/>
          
          {/* Le Dashboard est aussi une route privée */}
          <Route path='/dashboard' element={<Template/>}>
            {/* ... */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App
