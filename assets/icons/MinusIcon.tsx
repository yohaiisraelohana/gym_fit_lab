import { iconProps } from '@/types/icon'
import React from 'react'

export default function MinusIcon({classNameStyle , onClick}:iconProps) {
  return (
    <svg 
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNameStyle || "w-6 h-6"}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
</svg>

  )
}
