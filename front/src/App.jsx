
import React from 'react'
import { Route,Routes } from 'react-router'
/**CSS */
import './App.css'
import './App2.css'
import './App3.css'
/**Components */
import Layout from './Components/Layout'
/**Pages */
import Acceuil from './Pages/Acceuil'
import Formulaire from './Pages/Formulaire'
import Login from './Pages/Login'
function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Acceuil/>}/>
        <Route path='/formulaire' element={<Formulaire/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
  )
}

export default App
