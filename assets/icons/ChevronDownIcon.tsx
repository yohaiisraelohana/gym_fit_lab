import { iconProps } from '@/types/icon'
import React from 'react'

export default function ChevronDownIcon({classNameStyle , onClick}:iconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNameStyle || "w-6 h-6"} onClick={()=> onClick ? onClick() : console.log("no action sent")}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg> 
  )
}
