'use client'
import React, { CSSProperties } from 'react'

type TAIcon = {
  classNameStyle : string ;
  style: CSSProperties | null;
}

export default function ArrowIcon({classNameStyle , style}:TAIcon) {
  return (
    <svg style={style ? style : {}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNameStyle || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
    </svg>

  )
}
