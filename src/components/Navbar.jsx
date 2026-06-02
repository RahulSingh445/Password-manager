import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-600 flex justify-between px-10 py-5' >
      <div className='logo font-bold text-xl text-white'>Pass Manager</div>
      <ul className='flex gap-6 text-white font-medium'>
        <li><a className='hover:font-bold' href="/">Home</a></li>
        <li><a className='hover:font-bold' href="/about">About</a></li>
        <li><a className='hover:font-bold' href="/contact">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
