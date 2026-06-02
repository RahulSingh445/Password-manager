import React from 'react'

const Footer = () => {
  return (
    <div className='bg-purple-600 flex flex-col justify-center items-center p-1  bottom-0 w-full'>
        <div className='logo font-bold text-white text-2xl'>
            <span className='text-purple-900'>&lt;</span>
                    <span>Pass</span><span className='text-purple-900'> Manager/&gt;</span>
        </div>
      <div className='text-white font-medium'>
        Created by Rahul 
      </div>
    </div>
  )
}

export default Footer
