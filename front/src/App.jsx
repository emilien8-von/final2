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
//SErvice
import Private from './utils/helpers/Private'
import Public from './utils/helpers/Public'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Acceuil/>}/>
          {/*Route Public */}
          { /*<Route element = {<Public/>}> */}
            <Route path='/formulaire' element={<Formulaire/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/detail/:id' element={<Detail/>} />
            <Route path='/parametre' element={<Profil/>}></Route>
            <Route path='/mot-de-passe-oublie' element={<Forget/>}/> 
            <Route path='/reset-password/:token' element={<Reset/>}/>  
           { /*</Route>*/}
          {/*Fin de Route Public */}
          <Route path='/dashboard' element={<Template/>}>
                 { /*<Route path='/parametre' element={<Profil/>}></Route>*/}
          </Route>
      </Route>
    </Routes>
  )
}

export default App
