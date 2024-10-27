import { useState } from 'react'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='w-screen h-screen bg-[url(./src/assets/background.jpg)] items-center'>
      <div className='bg-black h-full opacity-75'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
