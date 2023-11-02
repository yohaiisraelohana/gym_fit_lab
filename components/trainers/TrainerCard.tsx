'use client';
import React, { useState } from 'react'

export default function TrainerCard(
    {trainer}:{trainer:TTrainer}) {
    const [showTrainerDetails , setShowTrainerDetails ] = useState<boolean>(false);
    const currentDate = new Date();
    const startedTime =trainer.training_since ? new Date(trainer.training_since) : new Date();
    const yearDifference = (currentDate.getFullYear() - startedTime.getFullYear()) * 12 + (currentDate.getMonth() - startedTime.getMonth()) / 12;
    //const monthsDifference = trainer.training_since ? (Date.now() - new Date(trainer.training_since).getTime() ) / (1000 * 60 * 60 * 24 * 30.44) : 0.0;
    
  return (
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.scrollTop = e.currentTarget.scrollTop > 0 ? 0 : 260;
          }}
          className="h-[290px] w-[200px] overflow-scroll md:w-[500px] bg-white rounded-sm flex max-md:flex-col"
          > <div 
              className="w-full md:w-[40%] md:h-full min-h-[260px] border-b md:border-r md:border-b-0 border-neutral-800">
              <img 
                src={trainer.trainer_img} 
                className="h-full w-full"
                alt="trainer image"/>
            </div>

            <div className="w-full md:w-[60%] min-h-[290px] md:overflow-y-auto md:h-full flex flex-col px-2 md:py-1 md:px-3 ">
              <div className="w-full flex items-center h-[30px]">
                <button
                  onClick={()=>setShowTrainerDetails(!showTrainerDetails)}
                  type='submit'
                  className="text-primary mr-auto md:hidden"
                  > { showTrainerDetails ? 
                      ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> 
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />  
                        </svg> ) : ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>  )}                                           
                </button>
                <p className=" font-bold ml-auto text-lg">{trainer.profile?.name}</p>
              </div>
              <div className="grid grid-cols-2 w-full">
                    <p>{trainer.trainees_count}</p>
                    <p className='text-end font-bold'>מתאמנים</p>
                    <p>{yearDifference.toFixed(1)}Y</p>
                    <p className='text-end font-bold'>ניסיון</p>
                    <p className='text-end col-span-2 font-bold'>:התמחות</p>
                    <p className='col-span-2 text-end'>{trainer.specializes_at ? trainer.specializes_at.map((item,ind)=> item +( ind + 1 < trainer.specializes_at?.length! ? " , " : "" )) : "ללא"}</p>
                    <p className='text-end col-span-2 font-bold'>{trainer.bio}</p>
              </div>
            </div>
        </form>
  )
}
