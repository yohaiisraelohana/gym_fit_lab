import ExerciseCard from "@/components/exercises/ExerciseCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";



export default async function page() {
  const supabase = createServerComponentClient({cookies});
  const { data: { user } } = await supabase.auth.getUser();
  
  const {data:savedExercises , error:savedError} = await supabase
      .from("savedExercises")
      .select('exercises(*)')
      .match({ 
        profile_id:user?.id, 
      });

  if(savedError)
        return ( <p>Error</p> );

    const isValidExercise = (data: any): data is TExercise => {
      return true ;
    };
  return (
    <div className="w-full flex flex-col items-center ">
      <h1 className="title">תרגילים שמורים</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {savedExercises && savedExercises
          .map( ({exercises} , ind) => (
            isValidExercise(exercises) &&
            <ExerciseCard key={ind} exercise={{...exercises}} />
        ))}
      </div>
    </div>
  )
}


