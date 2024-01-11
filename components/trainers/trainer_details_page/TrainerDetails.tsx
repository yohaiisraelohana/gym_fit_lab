import React from 'react'
import TrainerContactOptions from "@/components/trainers/TrainerContactOptions";
import TrainerRate from "@/components/trainers/TrainerRate";
import { TRAINER_DEFAULT_IMG } from "@/constants/defaultValues";
import { calculateTimeDiff } from "@/services/functions/calculateTimeDifference";
import { stringArrayToLine } from "@/services/functions/stringArrayToLine";
import ServerRouter from '@/components/common/ServerRouter';
import TrainerSendRequestBtnProvider from './TrainerSendRequestBtnProvider';
import ServerClient from '@/supabase/ServerClient';

export default async function TrainerDetails(
    {trainer_id}:{trainer_id:string}) {
        const supabase = ServerClient();
        const { data , error } = await supabase
            .from("trainer")
            .select("*,profile(name)")
            .match({id:trainer_id});
        
        if(!data || error){
            console.error(error);
            return <ServerRouter redirectPath="/trainers"/>
        }
    
        const trainer : TTrainer = data[0];

        // TODO: check request status and present in the button below
  return (
        <div className="flex max-md:flex-col items-center px-[6vw] md:mt-[5vw] gap-3 md:gap-[3vw] w-full lg:w-[92vw] xl:w-[85vw] xl:gap-[5vw] ">
            <div className="flex w-full justify-between md:hidden">
                <TrainerRate 
                    style="flex items-center text-white gap-1"
                    total_rate={trainer.total_rate!} 
                    total_raters={trainer.total_raters!} />
                <p className="text-2xl text-white">{trainer.profile?.name}</p>
            </div>
            <img 
                className="w-full md:w-2/5 lg:w-1/3"
                src={trainer.trainer_img || TRAINER_DEFAULT_IMG} 
                alt="trainer img" />

            
            <div className="w-full h-full flex flex-col items-center md:items-end md:justify-between gap-1 text-white text-center text-lg">
                <div className="flex w-full justify-between max-md:hidden">
                    <TrainerRate 
                        style="flex items-center text-white gap-1"
                        total_rate={trainer.total_rate!} 
                        total_raters={trainer.total_raters!} />
                    <p className="text-2xl text-white">{trainer.profile?.name}</p>
                </div>


                <div className="w-full flex flex-col md:flex-col-reverse items-center gap-3 py-2 md:pb-0 text-background md:order-1">
                    <TrainerSendRequestBtnProvider trainer_id={trainer_id} />
                    <TrainerContactOptions contact_options={trainer.contact_options!} />
                </div>


                <h3 className="font-bold md:text-start" dir="rtl">{trainer.bio}</h3>


                <div className="flex gap-2">
                    <p className="text-primary font-bold">מתאמנים</p>
                    <p>{trainer.trainees_count}</p>
                </div>

                <div className="flex gap-2">
                    <p className="text-primary font-bold">שנות ניסיון</p>
                    <p>{
                    calculateTimeDiff(
                        trainer.training_since ? new Date(trainer.training_since) : new Date(),
                        new Date(),
                        "year").toFixed(1)
                    }</p>
                </div>

                <div className="flex gap-2 md:text-end">
                    <p>ב- {stringArrayToLine(trainer.specializes_at!)}</p>
                    <p className="font-bold text-primary">מתמחה</p>
                </div>
            </div>

        </div>
  )
}
