import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
    <div className='min-h-screen flex flex-col'>

      <Navbar/>
      <div className=' flex-grow'>
        <Manager/>
      </div>
      <div className=''>

      <Footer/>
      </div>
    </div>
    </>
  )
}

export default App
