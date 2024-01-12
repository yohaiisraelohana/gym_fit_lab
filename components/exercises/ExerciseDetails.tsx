import DumbbelIcon from '@/assets/icons/DumbbelIcon'
import Image from 'next/image'
import React from 'react'
import BackRouteButton from '../common/BackRouteButton'

export default function ExerciseDetails(
  {exercise}:{exercise:TExercise}
) {
  return (
    <div className='w-full flex max-lg:flex-col justify-center items-center gap-4 py-4 lg:items-start lg:px-[5vw] lg:mt-[10vh] relative'>
      <BackRouteButton 
        href='/exercises'
        className='absolute top-[1vh] right-[8vw] lg:top-[-5vh]  lg:right-[5vw] text'/>
      <h1 className='title lg:hidden w-[70%] text-center'>{exercise.name}</h1>
      {/* Gif */}
      <div className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] rounded-md relative">
        <Image 
          className='rounded-md'
          alt='exercise image'
          src={exercise.gif_url}
          width={300}
          height={300}
          layout="responsive" />
        <button
          className=' absolute p-1 hover:bg-green-500/30 top-2 right-2 rounded-lg' 
          ><DumbbelIcon classNameStyle='h-6 w-6 md:h-8 md:w-8' />
        </button>
      </div>
      {/* Details */}
      <div className="flex flex-col w-[80%] justify-center items-center gap-2  ">
        <h1 className='title max-lg:hidden '>{exercise.name}</h1>
        <h3 className='text font-bold'>{exercise.body_part} - {exercise.equipment}</h3>
        <ul dir='rtl' className=''>
          {exercise.description && exercise.description
            .map((description) => (
              <li className='text flex items-start my-2 gap-1 '>
                <span className='text-5xl text-primary mt-[-13px]'>{"•"}</span>
                <p className="">{description}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
