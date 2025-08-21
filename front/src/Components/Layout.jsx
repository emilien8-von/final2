import React from 'react'
import { Outlet } from 'react-router'
import Header from './Templates/Header'
import Footer from './Templates/Footer'
const Layout = () => {
  return (
     <>
      <Header />
      <main className="main-content">
        <Outlet /> {/* C'est ici que vos pages (Accueil, etc.) s'afficheront */}
      </main>
      <Footer />
    </>
  )
}

export default Layout