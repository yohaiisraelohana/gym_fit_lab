import React from 'react'
import TrainerContactOptions from "@/components/trainers/TrainerContactOptions";
import TrainerRate from "@/components/trainers/TrainerRate";
import { TRAINER_DEFAULT_IMG } from "@/constants/defaultValues";
import { calculateTimeDiff } from "@/services/functions/calculateTimeDifference";
import { stringArrayToLine } from "@/services/functions/stringArrayToLine";

export default function TrainerDetails(
    {trainer}:{
        trainer:TTrainer;
    }) {
  return (
            <div className="flex flex-col items-center gap-3 w-full px-[6vw]">
            <div className="flex w-full justify-between">
                <TrainerRate 
                    style="flex items-center text-white gap-1"
                    total_rate={trainer.total_rate!} 
                    total_raters={trainer.total_raters!} />
                <p className="text-2xl text-white">{trainer.profile?.name}</p>
            </div>
            <img 
                className="w-full"
                src={trainer.trainer_img || TRAINER_DEFAULT_IMG} 
                alt="trainer img" />
            <button
                className="bg-primary w-full p-1 rounded-sm"
                >{"שלח בקשה"}
            </button>
            <TrainerContactOptions contact_options={trainer.contact_options!} />
            <div className="w-full flex flex-col items-center gap-1 text-white text-center text-lg">
                <h3 className="font-bold " dir="rtl">{trainer.bio}</h3>
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
                <div className="flex gap-2">
                    <p>ב- {stringArrayToLine(trainer.specializes_at!)}</p>
                    <p className="font-bold text-primary">מתמחה</p>
                </div>
            </div>

        </div>
  )
}
