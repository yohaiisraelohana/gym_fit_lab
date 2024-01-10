"use client"

import { useState } from "react";
import ExercisesList from "./ExercisesList"
import ManBodyButtons from "./ManBodyButtons"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadNextExercisesButton from "./LoadNextExercisesButton";
import LoadingDumbbells from "../reusefull/LoadingDumbbells";

export default function ExercisesPage(
    {exercises_first_list , all_exercises_count}:{
        exercises_first_list:TExercise[];
        all_exercises_count:number;
    }
) {
   const [exercises , setExercises] = useState<TExercise[]>(exercises_first_list);
   const [selected_body_part , setSelectedBodyPart] = useState<string>("");
   const [ is_loading , setIsLoading ] = useState<boolean>(false);
   const [ count_exercises , setCountExercises ] = useState<number>(all_exercises_count);
   const supabase  =  createClientComponentClient();
   const limit = 20;
   
   const loadNextExercises = async () => {
        setIsLoading(true);
        if(selected_body_part != ""){
            const {data , error} = await supabase
                .rpc("get_exercises_offset_by_body_part",{body_part_selected:selected_body_part,skip:exercises.length,return_limit:limit});

            console.log({data,error});
            
            if(data)
                setExercises(prev => [...prev, ...data]);

        } else {
            const {data ,  error} = await supabase
                .rpc("get_exercises_offset",{skip:exercises.length,return_limit:limit});
            
            console.log({data,error});

            if(data)
                setExercises(prev => [...prev, ...data]);
        } 
        setIsLoading(false);
   }

   const getExercises = async () => {
    const {data} = await supabase
        .from("exercises")
        .select()
        .limit(limit);

    if(data)
        setExercises(data);
    
    setCountExercises(all_exercises_count);
   }

   const getExercisesByBodyPart = async (body_part:string) => {
    const {data} = await supabase
        .from("exercises")
        .select()
        .match({body_part})
        .limit(limit);
      
    if(data)
        setExercises(data);

    const {count} = await supabase
        .from("exercises")
        .select('*', { count: 'exact', head: true })
        .match({body_part});
    
    setCountExercises(count || 0);
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

    console.log(count_exercises);
  return (
    <>
        { is_loading && <LoadingDumbbells />}
        <ManBodyButtons 
            selected_body_part={selected_body_part}
            hundleBodyPartSelected={hundleBodyPartSelected} />
        <ExercisesList exercises={exercises} />
        <LoadNextExercisesButton
            current_exercises_length={exercises.length}
            max_exercises_length={count_exercises}
            handleClick={loadNextExercises}/>
    </>
  )
}


