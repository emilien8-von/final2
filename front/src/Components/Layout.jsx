import React from 'react'
import { Outlet } from 'react-router'
import Header from './Templates/Header'
import Footer from './Templates/Footer'
const Layout = () => {
  return (
    <div>
       <Header/>
       <main> 
        <section>
          <Outlet/> 
       </section>
       </main>
       <Footer/>
    </div>
    
  )
}

export default Layout