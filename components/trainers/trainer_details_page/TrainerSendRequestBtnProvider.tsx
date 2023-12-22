
import { getCurrentShortTime } from '@/services/functions/getCurrentShortTime';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react'
import TrainerSendRequestBtn from './TrainerSendRequestBtn';
// ? consider create another client component to handle state menagment changes

export default async function TrainerSendRequestBtnProvider({trainer_id}:{trainer_id:string;}) {
    const supabase = createServerComponentClient({cookies});

    const { data:{user} } = await supabase.auth.getUser();
    
    let traineeTrainerStatus = "שלח בקשה";

    if(user){
        const {data } = await supabase
            .from("trainerTraineeProgram")
            .select()
            .match({trainer_id,trainee_id:user.id})
            .gt("end_date", getCurrentShortTime());
        
        if(data && data.length > 0){
            traineeTrainerStatus = "התנתק ממאמן";
        } else {
            const {data : req_data } = await supabase
                .from("trainingRequest")
                .select()
                .match({trainer_id,trainee_id:user.id});
            if(req_data && req_data.length > 0)
                traineeTrainerStatus = "בטל בקשה"
        }
    }



  return (
    <TrainerSendRequestBtn 
        trainer_id={trainer_id}        
        traineeTrainerStatus={traineeTrainerStatus}
        user={user}/>
    )
}
