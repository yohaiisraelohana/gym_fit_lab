import { iconProps } from '@/types/icon'
import React from 'react'

export default function ChevronLeftIcon({classNameStyle , onClick}:iconProps) {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth={1.5} stroke="currentColor" className={classNameStyle || "w-6 h-6"}
        onClick={onClick}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>

  )
}
