import ServerRouter from "@/components/common/ServerRouter";
import ExerciseDetails from "@/components/exercises/ExerciseDetails";
import supabase from "@/services/supabaseCreateClient";

export default async function page(
    {params}:{
        params:{
            id:string;
        }
    }
) {
    const {id} = params;
    const {data , error } = await supabase
        .from("exercises")
        .select()
        .match({id})
        .single();

    if(!data || error)
        return <ServerRouter redirectPath="/exercises" />
    
  return ( <ExerciseDetails exercise={data} /> )
}
