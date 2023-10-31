'use client'
import Image from "next/image"
import ExerciseMenu from "./ExerciseMenu"

export default function ExerciseCard({exercise}:{exercise : TExercise}) {
   
  return (
    <div 
        key={exercise.id}
        className="text-center text-black bg-white flex flex-col relative">
        <ExerciseMenu id={exercise.id} />
        <Image 
            height={200}
            width={200}
            className=' bg-white md:w-[90%]'
            src={exercise.gif_url}
            alt='exercise gif'
        />
        <p className='w-full text-lg md:px-2'>{exercise.name}</p>
    </div>
  )
}
