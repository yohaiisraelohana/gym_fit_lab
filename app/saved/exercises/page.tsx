import ExerciseCard from "@/components/exercises/ExerciseCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

//!Check Errors

export default async function page() {
  const supabase = createServerComponentClient({cookies});
  const { data: { user } } = await supabase.auth.getUser();
  
  const {data:savedItems , error:savedError} = await supabase
      .from("saved")
      .select('item_id')
      .match({ 
        type:'exercise',
        profile_id:user?.id, 
      });
      
  if(savedError)
        return ( <p>Error</p> )

  const exercisesIds : number[] = savedItems.map((saved)=>saved.item_id);

  const {data:exercises , error:exerciseError} = await supabase
      .from("exercises")
      .select()
      .in("id",exercisesIds);


  return (
    <div className="w-full flex flex-col items-center ">
      <h1 className="title">תרגילים שמורים</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {exercises && exercises.map((exercise , ind)=>(
          <ExerciseCard key={ind} exercise={exercise} />
        ))}
      </div>
    </div>
  )
}


