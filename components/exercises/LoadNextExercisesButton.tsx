import ChevronUpIcon from '@/assets/icons/ChevronUpIcon'
import React from 'react'

export default function LoadNextExercisesButton(
    {handleClick , current_exercises_length , max_exercises_length}:{
      handleClick:()=>void;
      current_exercises_length:number;
      max_exercises_length:number;
    }
) {
  return (
    <>
      { current_exercises_length < max_exercises_length &&
        <button
          onClick={handleClick} 
          className='w-full flex mb-4'><ChevronUpIcon classNameStyle='h-6 w-6 text-primary m-auto'/></button>
      }
    </>
  )
}
