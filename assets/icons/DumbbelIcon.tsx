import { iconProps } from '@/types/icon'
import React from 'react'
//import icon from '../images/dumbbell.png'

export default function DumbbelIcon({classNameStyle}:iconProps) {
  return (
	<img 
		className={classNameStyle || "h-6 w-8"}
		src="https://res.cloudinary.com/dftounwvk/image/upload/v1698649471/dumbbell_563879_yu0ggi.png" 
		alt="dumbbell icon" />
  )
}
