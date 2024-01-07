'use client';
import ChevronDownIcon from '@/assets/icons/ChevronDownIcon';
import ChevronUpIcon from '@/assets/icons/ChevronUpIcon';
import { TRAINER_DEFAULT_IMG } from '@/constants/defaultValues';
import React, {  useRef, useState } from 'react'
import TrainerRate from './TrainerRate';
import Link from 'next/link';
import { calculateTimeDiff } from '@/services/functions/calculateTimeDifference';
import { stringArrayToLine } from '@/services/functions/stringArrayToLine';
import { AnimatedGradientBorder } from '../reusefull/AnimatedGradientBorder';

export default function TrainerCard(
    {trainer}:{trainer:TTrainer}) {
    const [showTrainerDetails , setShowTrainerDetails ] = useState<boolean>(false);
    const yearDifference = calculateTimeDiff(
      trainer.training_since ? new Date(trainer.training_since) : new Date(),
      new Date(),
      "year");
    
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleShowDetailsOnMobile = () => {
      setShowTrainerDetails(!showTrainerDetails)
      formRef.current!.scrollTop = formRef.current!.scrollTop > 0 ? 0 : 260;
    }

  return (
        <form 
          ref={formRef}
          className="max-h-[290px] h-[290px] w-[200px] overflow-scroll md:w-[500px] bg-white rounded-sm flex max-md:flex-col"
          > <div 
              className="w-full md:w-[40%] md:h-full min-h-[260px] border-b md:border-r md:border-b-0 border-neutral-800">  
                  <img 
                    src={trainer.trainer_img || TRAINER_DEFAULT_IMG}   
                    className="h-full w-full"  
                    alt="trainer image"/> 
            </div>

            <div className="w-full md:w-[60%] min-h-[290px] md:overflow-y-auto md:h-full flex flex-col md:justify-around   p-2 pt-0  md:py-1 md:px-3 ">
              <div className="w-full flex items-start h-[60px] md:h-[30px]">
                <div className="mr-auto flex items-center pt-1">
                <button
                  onClick={handleShowDetailsOnMobile}
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
              <div className="bg-white ml-auto rounded-sm text-center max-md:w-full my-1">
                <AnimatedGradientBorder rounded="2px" >
                  <Link className='bg-white px-2 p-1 w-full'
                        href={`/trainers/${trainer.id}`}>לפרטים נוספים</Link>
                </AnimatedGradientBorder>
              </div>
              
            </div>
        </form>
  )
}
