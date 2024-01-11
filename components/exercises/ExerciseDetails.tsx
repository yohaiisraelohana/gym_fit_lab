import Image from 'next/image'
import React from 'react'

export default function ExerciseDetails(
  {exercise}:{exercise:TExercise}
) {
  return (
    <div className='w-full flex max-lg:flex-col justify-center items-center gap-4 py-4'>
      <h1 className='title lg:hidden w-[70%] text-center'>{exercise.name}</h1>
      {/* Gif */}
      <div className="w-[80%] rounded-md">
        <Image 
          className='rounded-md'
          alt='exercise image'
          src={exercise.gif_url}
          width={300}
          height={300}
          layout="responsive" />
      </div>
      {/* Details */}
      <div className="flex flex-col w-[80%] justify-center items-center gap-2">
        <h1 className='title max-lg:hidden'>{exercise.name}</h1>
        <h3 className='text font-bold'>{exercise.body_part} - {exercise.equipment}</h3>
        <ul dir='rtl' className='list-disc'>
          {exercise.description && exercise.description
            .map((description) => (
              <li className='text'>{description}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}