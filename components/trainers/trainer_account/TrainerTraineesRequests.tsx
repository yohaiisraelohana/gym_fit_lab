"use client"
import ProfileIcon from '@/assets/icons/ProfileIcon';
import React from 'react'

export default function TrainerTraineesRequests(
    {trainees_request_list}:{
        trainees_request_list : TTrainerRequest [];
    }
) {
    console.log({trainees_request_list})
  return (
    <div className='w-full px-[10vw] text'>
        <div className="flex w-full justify-between border-b-2 border-white items-center">
            <p className='px-1'>{trainees_request_list.length}</p>
            <h1 className='title'>בקשות מתאמנים</h1>
        </div>

        <div className="w-full h-[25vh] flex flex-col items-center justify-start overflow-y-auto ">
            {
                trainees_request_list
                    .map(({trainee_id:trainee},key)=>(
                        <div 
                            dir='rtl'
                            key={key}
                            className="w-full flex justify-between py-2 text">


                            <div className="flex justify-center gap-2 items-end">
                                { trainee.profile_img
                                    
                                    ? <img 
                                        className='border border-white rounded-full w-[30px] h-[30px] '
                                        src={trainee.profile_img}
                                        alt="user profile img" />
                                    : <ProfileIcon classNameStyle="border border-white w-[30px] h-[30px] rounded-full text" />
                                }
                                <strong>{trainee.name}</strong>
                            </div>

                            <div className="flex justify-center gap-3 items-end ">
                                <button
                                    className='text-primary'
                                    >{"קבל"}
                                </button>
                                <button
                                    className='text-red-600'
                                    >{"דחה"}
                                </button>
                            </div>
                            

                        </div>
                    ))
            }
        </div>
    </div>
  )
}
