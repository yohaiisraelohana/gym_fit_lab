"use client"

import ExerciseCard from "./ExerciseCard";

export default function ExercisesList(
    {exercises}:{
        exercises:TExercise[];
    }) {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 bg-background p-[4vw] gap-[4vw]">
        {exercises.map((exercise,key) => (
            <ExerciseCard exercise={exercise} key={key} />
        ))}
    </div> 
  )
}
