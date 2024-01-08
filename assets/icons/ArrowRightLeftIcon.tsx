import { iconProps } from '@/types/icon'
import React from 'react'

export default function ArrowRightLeftIcon(
    {classNameStyle ,  onClick}:iconProps
) {
  return (
    <svg
        onClick={() => onClick ? onClick() : console.log("no action provided")}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={classNameStyle || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>

  )
}
