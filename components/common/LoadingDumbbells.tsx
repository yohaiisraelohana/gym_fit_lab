import DumbbelIcon from '@/assets/icons/DumbbelIcon'
import React from 'react'

export default function LoadingDumbbells({bg}:{bg?:string}) {
  return (
    <div className='h-20 w-20 inset-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center backdrop-blur-sm bg-white/30 absolute rounded-md '>
        <div className=" animate-spin h-1/2 w-1/2 rounded-full border-2  border-t-[#4efa84] border-b-[#4efa84] border-l-transparent border-r-transparent relative">
            
        </div>
    </div>
  )
}
