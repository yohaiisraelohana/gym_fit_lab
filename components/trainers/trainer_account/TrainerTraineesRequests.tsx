"use client"
import React from 'react'
import TrainerTraineeRequestCard from './TrainerTraineeRequestCard';

export default function TrainerTraineesRequests(
    {trainees_request_list}:{
        trainees_request_list : TTrainerRequest [];
    }
) {
  return (
    <div className='w-full px-[10vw] text'>

        <div className="flex w-full justify-between border-b-2 border-white items-center">
            <p className='px-1'>{trainees_request_list.length}</p>
            <h1 className='title'>בקשות מתאמנים</h1>
        </div>

        <div className="w-full h-[25vh] flex flex-col items-center justify-start overflow-y-auto ">
            {trainees_request_list
                .map(({trainee_id:trainee},key)=>(
                    <TrainerTraineeRequestCard trainee={trainee} key={key} />
                ))
            }
        </div>
    </div>
  )
}
