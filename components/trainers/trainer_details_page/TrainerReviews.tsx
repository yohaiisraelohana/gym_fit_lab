import ServerClient from '@/supabase/ServerClient';
import React from 'react'

export default async function TrainerReviews({trainer_id}:{trainer_id:string;}) {
    const supabase = ServerClient();
    const {data , error} = await supabase
        .from("trainerRate")
        .select()
        .match({trainer_id})
        .limit(20);
    
    if(!data && error)
        return <div className="">Error</div>
    
    const raters : TTrainerRate[] = data;

  return (
    <div>
        <h1 className='title'>ביקורות</h1>
    </div>
  )
}
