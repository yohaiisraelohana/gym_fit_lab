import ServerRouter from "@/components/reusefull/ServerRouter";
import TraineesChange from "@/components/trainers/TraineesChange";
import TrainerDetails from "@/components/trainers/TrainerDetails";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page(
    {params}:{
        params:{
            trainer_id:string;
        }
    }
) {
    const {trainer_id} = params;
    const supabase = createServerComponentClient({cookies});
    const { data , error } = await supabase
        .from("trainer")
        .select("*,profile(name)")
        .match({id:trainer_id});
    
    if(!data || error){
        console.log({data,error})
        return <ServerRouter redirectPath="/trainers"/>
    }

    const trainer : TTrainer = data[0];

    const {data:traineesChangeData , error:traineesChangeError} = await supabase
        .rpc("get_trainer_trainees_change",{profile_id:trainer_id});
    console.log({traineesChangeData,traineesChangeError});
    
    //const TraineesChange ="a"; 

  return (
    <div className="flex flex-col items-center w-screen pt-2 pb-6 h-screen overflow-y-auto gap-20 ">
        
        <TrainerDetails trainer={trainer} />
        {traineesChangeData &&
            <TraineesChange changes={traineesChangeData} />}
        
    </div>
  )
}
