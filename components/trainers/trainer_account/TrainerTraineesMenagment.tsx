import ServerClient from '@/supabase/ServerClient'
import React from 'react'
import TrainerTraineesRequests from './TrainerTraineesRequests';
import TrainerTraineesPrograms from './TrainerTraineesPrograms';

export default async function TrainerTraineesMenagment(
    {trainer_id}:{trainer_id:string}
) {
    const supabase = ServerClient();
    const {data:trainer_requests_data , error:trainer_requests_error} = await supabase
        .from("trainingRequest")
        .select("*,trainee_id(*)")
        .match({trainer_id});

    const trainer_requests : TTrainerRequest[]  =  trainer_requests_data || [];


    const {data:trainer_trainees_data , error:trainer_trainees_error } = await supabase
        .from("trainerTraineeProgram")
        .select()
        .match({trainer_id});
    
    const trainer_trainees_programs : TTrainerTraineeProgram[]  = trainer_trainees_data || [];

    console.log({trainer_requests,trainer_trainees_programs});
    console.log({trainer_requests_error , trainer_trainees_error});
    
  return (
    <section className='w-screen'>

        <TrainerTraineesRequests 
          trainees_request_list={trainer_requests}/>
        <TrainerTraineesPrograms 
          first_trainees_list={trainer_trainees_programs}/>
    </section>
  )
}
