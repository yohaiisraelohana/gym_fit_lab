import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link 
        className=' mr-auto '
        href={"/"}>
        <p className='text text-xl'>GF<span className='text-[var(--primary)]'>Lab</span></p>
    </Link>
  )
}
