'use client';
import ChevronDownIcon from '@/assets/icons/ChevronDownIcon';
import ChevronUpIcon from '@/assets/icons/ChevronUpIcon';
import { TRAINER_DEFAULT_IMG } from '@/constants/defaultValues';
import React, {  useRef, useState } from 'react'
import TrainerRate from './TrainerRate';
import Link from 'next/link';
import { calculateTimeDiff } from '@/services/functions/calculateTimeDifference';
import { stringArrayToLine } from '@/services/functions/stringArrayToLine';
import { AnimatedGradientBorder } from '../common/AnimatedGradientBorder';

export default function TrainerCard(
    {trainer}:{trainer:TTrainer}) {
    const [showTrainerDetails , setShowTrainerDetails ] = useState<boolean>(false);
    const yearDifference = calculateTimeDiff(
      trainer.training_since ? new Date(trainer.training_since) : new Date(),
      new Date(),
      "year");
    
    const containerRef = useRef<HTMLDivElement | null>(null);
    const handleShowDetailsOnMobile = () => {
      setShowTrainerDetails(!showTrainerDetails)
      containerRef.current!.scrollTop = containerRef.current!.scrollTop > 0 ? 0 : 260;
    }
  return (
    <div 
        ref={containerRef}
        className='h-[290px] w-[200px] rounded-sm  flex max-md:flex-col  overflow-x-hidden md:w-[500px]  max-md:overflow-y-auto md:overflow-hidden'>
        <div className=" w-[200px] max-md:min-h-[257px] md:h-[290px] ">
            <img
                src={trainer.trainer_img || TRAINER_DEFAULT_IMG}
                alt='trainer image'
                className='w-full h-full'/>
        </div>
        <div className=" w-[200px] md:w-[300px] md:overflow-y-auto bg-white">
            <div className="flex flex-col px-2 min-h-[285px] justify-between pb-2">
                {/* Header */}
                <div className="w-full flex items-start h-[60px] md:h-[30px]">
                    <div className="mr-auto flex items-center pt-1">
                    <button
                      type='button'
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

                {/* Content */}
                <div className="grid grid-cols-2 w-full">
                    <p>{trainer.trainees_count}</p>
                    <p className='text-end font-bold'>מתאמנים</p>
                    <p>{yearDifference.toFixed(1)}Y</p>
                    <p className='text-end font-bold'>ניסיון</p>
                    <p className='text-end col-span-2 font-bold'>:התמחות</p>
                    <p className='col-span-2 text-end'>{trainer.specializes_at ? stringArrayToLine(trainer.specializes_at) : "ללא"}</p>
                    <p className='text-end col-span-2 font-bold'>{trainer.bio && trainer.bio }</p>
                </div>

                {/* Footer */}
                <div className="bg-white ml-auto rounded-sm text-center max-md:w-full my-1 ">
                    <AnimatedGradientBorder rounded="2px" >
                      <Link className='bg-white px-2 p-1 w-full'
                            href={`/trainers/${trainer.id}`}>לפרטים נוספים</Link>
                    </AnimatedGradientBorder>
                </div>

            </div>
        </div>
    </div>
  )
}
