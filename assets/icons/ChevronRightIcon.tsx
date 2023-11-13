import { iconProps } from '@/types/icon'
import React from 'react'

export default function ChevronRightIcon({onClick , classNameStyle}:iconProps) {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={classNameStyle || "w-6 h-6"}
        onClick={onClick}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

  )
}
