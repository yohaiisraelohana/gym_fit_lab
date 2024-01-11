'use client'
import LoadingDumbbells from '@/components/common/LoadingDumbbells';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import React, { useState } from 'react'

export default function TrainerSendRequestBtn(
    {traineeTrainerStatus , user , trainer_id}:{
        user:User | null;
        traineeTrainerStatus:string;
        trainer_id:string;
    }) {

    const [current_trainee_trainer_status , setCurrentTraineeTrainerStatus ] = useState(traineeTrainerStatus);
    const [error , setError] = useState<TError|null>(null);
    const [isLoading , setIsLoading] = useState(false);
    const supabase = createClientComponentClient();

    const handleChangeStatus = async (current_status:string) => {
        if(!user)
            return setError({error:user , message:"פעולה זו למשתמשים רשומים בלבד"});

        switch (current_status) {
            case "שלח בקשה":
                const { error:trainingRequestErr } = await supabase 
                    .from("trainingRequest")
                    .upsert({trainer_id,trainee_id:user.id})
                    .select();

                if(trainingRequestErr)
                    return setError({error:trainingRequestErr , message:"שגיאה בשליחת בקשה למאמן"});

                setCurrentTraineeTrainerStatus("בטל בקשה");
                break;

            case "התנתק ממאמן":
                const { error:trainerTraineeProgramErr } = await supabase
                    .from("trainerTraineeProgram")
                    .delete()
                    .match({trainer_id,trainee_id:user.id});

                if(trainerTraineeProgramErr)
                    return setError({error:trainerTraineeProgramErr , message:"שגיאה בהתנתקות ממאמן" });

                setCurrentTraineeTrainerStatus("שלח בקשה");
                break;

            case "בטל בקשה":
                const { error:cancelTrainingRequestErr } = await supabase 
                    .from("trainingRequest")
                    .delete()
                    .match({trainer_id,trainee_id:user.id});

                if(cancelTrainingRequestErr)
                    return setError({error:cancelTrainingRequestErr , message:"שגיאה בשליחת בקשה למאמן"});

                setCurrentTraineeTrainerStatus("שלח בקשה");
                break;
        }  
    }

    const handleClick = async () => {
        setIsLoading(true);
        await handleChangeStatus(current_trainee_trainer_status);
        setIsLoading(false);
    }

  return (
    <>
        {isLoading && <LoadingDumbbells />}
        <button
            onClick={handleClick}
            disabled={!user}
            style={user ? {} : {opacity:0.5}}
            className="bg-primary w-full p-1 rounded-sm"
            >{current_trainee_trainer_status}
        </button>
    </>
  )
}
