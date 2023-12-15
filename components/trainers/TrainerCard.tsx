'use client';
import ChevronDownIcon from '@/assets/icons/ChevronDownIcon';
import ChevronUpIcon from '@/assets/icons/ChevronUpIcon';
import { TRAINER_DEFAULT_IMG } from '@/constants/defaultValues';
import React, { useState } from 'react'
import TrainerRate from './TrainerRate';
import Link from 'next/link';
import { calculateTimeDiff } from '@/services/functions/calculateTimeDifference';
import { stringArrayToLine } from '@/services/functions/stringArrayToLine';

export default function TrainerCard(
    {trainer}:{trainer:TTrainer}) {
    const [showTrainerDetails , setShowTrainerDetails ] = useState<boolean>(false);
    const yearDifference = calculateTimeDiff(
      trainer.training_since ? new Date(trainer.training_since) : new Date(),
      new Date(),
      "year");
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
              <Link
                href={`/trainers/${trainer.id}`}
                >     
                  <img 
                    src={trainer.trainer_img || TRAINER_DEFAULT_IMG}   
                    className="h-full w-full hover:shadow-md  hover:shadow-[var(--primary)]"  
                    alt="trainer image"/> 
              </Link>
            </div>

            <div className="w-full md:w-[60%] min-h-[290px] md:overflow-y-auto md:h-full flex flex-col px-2 md:py-1 md:px-3 ">
              <div className="w-full flex items-start h-[60px] md:h-[30px]">
                <div className="mr-auto flex items-center pt-1">
                <button
                  onClick={()=>setShowTrainerDetails(!showTrainerDetails)}
                  type='submit'
                  className="text-primary md:hidden "
                  > { showTrainerDetails 
                      ? <ChevronUpIcon classNameStyle='h-6 w-6' /> 
                      : <ChevronDownIcon classNameStyle='h-6 w-6'/> }                                           
                </button>
                <TrainerRate style='flex items-center gap-1' total_rate={trainer.total_rate!} total_raters={trainer.total_raters!} />
                </div>
                <p className=" font-bold ml-auto text-lg text-end break-words ">{trainer.profile?.name}</p>
              </div>
              <div className="grid grid-cols-2 w-full">
                    <p>{trainer.trainees_count}</p>
                    <p className='text-end font-bold'>מתאמנים</p>
                    <p>{yearDifference.toFixed(1)}Y</p>
                    <p className='text-end font-bold'>ניסיון</p>
                    <p className='text-end col-span-2 font-bold'>:התמחות</p>
                    <p className='col-span-2 text-end'>{trainer.specializes_at ? stringArrayToLine(trainer.specializes_at) : "ללא"}</p>
                    <p className='text-end col-span-2 font-bold'>{trainer.bio && trainer.bio }</p>
              </div>
            </div>
        </form>
  )
}
