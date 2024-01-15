import ServerClient from '@/supabase/ServerClient'
import React from 'react'

export default async function TrainerTraineesMenagment(
    {trainer_id}:{trainer_id:string}
) {
    const supabase = ServerClient();
    const {data:trainer_requests_data , error:trainer_requests_error} = await supabase
        .from("trainingRequest")
        .select()
        .match({trainer_id})
        .returns<TTrainerRequest[]>();

    const trainer_requests : TTrainerRequest[]  =  trainer_requests_data || [];


    const {data:trainer_trainees_data , error:trainer_trainees_error } = await supabase
        .from("trainerTraineeProgram")
        .select()
        .match({trainer_id});
    
    const trainer_trainees_programs : TTrainerTraineeProgram[]  = trainer_trainees_data || [];
  return (
    <section>
        
    </section>
  )
}
