import { iconProps } from '@/types/icon'
import React from 'react'

export default function ArrowUpDownIcon({classNameStyle , onClick }:iconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
        className={classNameStyle ||"w-6 h-6"}
        onClick={()=>onClick ? onClick() : console.log("no action provided")}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>

  )
}
