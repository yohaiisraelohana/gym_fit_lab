import React from 'react'

export default function LoadNextExercisesButton(
    {handleClick}:{handleClick:()=>void}
) {
  return (
    <button
        onClick={handleClick} 
        className='w-full text-center text'>טען עוד</button>
  )
}
