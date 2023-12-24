import React from 'react'
import ChangeCard from '../../changes/ChangeCard';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function TraineesChange({trainer_id}:{trainer_id:string;}) {

    const supabase = createServerComponentClient({cookies});

    //TODO: add limit in supabase
    const {data , error} = await supabase
        .rpc("get_trainer_trainees_change",{profile_id:trainer_id});
    
    if(!data && error)
        return <div className="">Error</div>;    

    const changes : TChange[] = data;   
  return (
    <div className='w-full flex flex-col items-center gap-4 '>
        <h1 className="text-white text-3xl">שינויים של מתאמנים</h1>
        <div dir='rtl' className="grid grid-flow-col grid-rows-1 w-[90vw] gap-4 overflow-x-auto overflow-y-hidden h-fit">
            {changes.map((change , i) => (
                    <div dir='ltr' key={i} className="w-[60vw] sm:w-[50vw] md:w-[55vw] lg:w-[40vw] xl:w-[30vw] h-fit">
                        <ChangeCard 
                            change_card_style="h-[80vw] sm:h-[65vw] md:h-[40vw] lg:h-[30vw] xl:h-[22vw] w-full   bg-white shadow-md rounded-sm   relative   flex flex-col justify-between" 
                            change={change} />
                    </div>
            ))}
            {changes.map((change , i) => (
                    <div dir='ltr' key={i} className="w-[60vw] sm:w-[50vw] md:w-[55vw] lg:w-[40vw] xl:w-[30vw] h-fit">
                        <ChangeCard 
                            change_card_style="h-[80vw] sm:h-[65vw] md:h-[40vw] lg:h-[30vw] xl:h-[22vw] w-full   bg-white shadow-md rounded-sm   relative   flex flex-col justify-between" 
                            change={change} />
                    </div>
            ))}
            {changes.map((change , i) => (
                    <div dir='ltr' key={i} className="w-[60vw] sm:w-[50vw] md:w-[55vw] lg:w-[40vw] xl:w-[30vw] h-fit">
                        <ChangeCard 
                            change_card_style="h-[80vw] sm:h-[65vw] md:h-[40vw] lg:h-[30vw] xl:h-[22vw] w-full   bg-white shadow-md rounded-sm   relative   flex flex-col justify-between" 
                            change={change} />
                    </div>
            ))}
            {changes.map((change , i) => (
                    <div dir='ltr' key={i} className="w-[60vw] sm:w-[50vw] md:w-[55vw] lg:w-[40vw] xl:w-[30vw] h-fit">
                        <ChangeCard 
                            change_card_style="h-[80vw] sm:h-[65vw] md:h-[40vw] lg:h-[30vw] xl:h-[22vw] w-full   bg-white shadow-md rounded-sm   relative   flex flex-col justify-between" 
                            change={change} />
                    </div>
            ))}

        </div>

    </div>
  )
}
