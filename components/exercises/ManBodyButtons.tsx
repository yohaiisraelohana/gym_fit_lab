import React from 'react'
import FrontManBodyButtons from './FrontManBodyButtons'
import BackManBodyButtons from './BackManBodyButtons'

export default function ManBodyButtons() {
  return (
    <div className="flex max-md:flex-col justify-center items-center w-screen md:bg-gradient-to-t md:from-neutral-200 md:to-50%   ">
        <FrontManBodyButtons/>
        <BackManBodyButtons/>
    </div>
  )
}
