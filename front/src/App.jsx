
import React from 'react'
import { Route,Routes } from 'react-router'
/**CSS */
import './App.css'
import './App2.css'
import './App3.css'
/**Components */
import Layout from './Components/Layout'
import Template from './Components/Admin/template/Template'
/**Pages */
import Acceuil from './Pages/Acceuil'
import Formulaire from './Pages/Formulaire'
import Login from './Pages/Login'
//SErvice
import Private from './utils/helpers/Private'
import Public from './utils/helpers/Public'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Acceuil/>}/>
          {/*Route Public */}
           <Route element = {<Public/>}> 
            <Route path='/formulaire' element={<Formulaire/>}/>
            <Route path='/login' element={<Login/>}/>
          </Route>
          {/*Fin de Route Public */}
          <Route path='/dashboard' element={<Template/>}>

          </Route>
      </Route>
    </Routes>
  )
}

export default App
