import React from 'react'
import { Outlet } from 'react-router'
import Header from './Templates/Header'
import Footer from './Templates/Footer'
const Layout = () => {
  return (
     <>
      <Header />
      <main className="main-content">
        <Outlet /> 
      </main>
      <Footer />
    </>
  )
}

export default Layout