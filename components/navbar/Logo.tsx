import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link 
        className=' mr-auto '
        href={"/"}>
        {/* <img 
            src="https://res.cloudinary.com/dftounwvk/image/upload/v1695039741/GymFitLabLogo_aq7emg.svg" 
            className='h-6 '
            alt="logo" /> */}
        <p className='text text-xl'>GF<span className='text-[var(--primary)]'>Lab</span></p>
    </Link>
  )
}
