"use client"

import { useState } from "react";
import ExercisesList from "./ExercisesList"
import ManBodyButtons from "./ManBodyButtons"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadNextExercisesButton from "./LoadNextExercisesButton";

export default function ExercisesPage(
    {exercises_first_list}:{
        exercises_first_list:TExercise[];
    }
) {
   const [exercises , setExercises] = useState<TExercise[]>(exercises_first_list);
   const [selected_body_part , setSelectedBodyPart] = useState<string>("");
   const supabase  =  createClientComponentClient();
   const limit = 20;
   
   const loadNextExercises = async () => {
        if(selected_body_part != ""){
            const {data} = await supabase
                .rpc("get_exercises_offset_by_body_part",{body_part_selected:selected_body_part,skip:exercises.length,return_limit:limit});

            console.log(data);
            
            if(data)
                setExercises(prev => [...prev, ...data]);
        } else {
            const {data} = await supabase
                .rpc("get_exercises_offset_by_body_part",{skip:exercises.length,return_limit:limit});
            
            console.log(data);

            if(data)
                setExercises(prev => [...prev, ...data]);
        } 
   }

   const getExercises = async () => {
    const {data} = await supabase
        .from("exercises")
        .select()
        .limit(limit);

    if(data)
        setExercises(data);
   }

   const getExercisesByBodyPart = async (body_part:string) => {
    const {data} = await supabase
        .from("exercises")
        .select()
        .match({body_part})
        .limit(limit);
      
    if(data)
        setExercises(data);
   }

   const updateExercisesList = async (body_part:string) => {
    if(body_part == selected_body_part){
        getExercises();
    } else {
        getExercisesByBodyPart(body_part);
    }
   }

   const hundleBodyPartSelected = (body_part:string) => {
        setSelectedBodyPart(prev => prev == body_part ? "" : body_part);
        updateExercisesList(body_part);
    }
  return (
    <>
        <ManBodyButtons 
            selected_body_part={selected_body_part}
            hundleBodyPartSelected={hundleBodyPartSelected} />
        <ExercisesList exercises={exercises} />
        <LoadNextExercisesButton
            handleClick={loadNextExercises}/>
    </>
  )
}


