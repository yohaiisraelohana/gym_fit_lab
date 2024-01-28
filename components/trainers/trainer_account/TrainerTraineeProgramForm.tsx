"use client"
import UserProfileImg from '@/components/navbar/UserProfileImg'
import { getCurrentShortTime } from '@/services/functions/getCurrentShortTime';
import { userStore } from '@/stores/userStore';
import React, {  useState } from 'react'

export default function TrainerTraineeProgramForm(
    {trainee , exist_program}:{
        trainee:TTrainee;
        exist_program?:TTrainerTraineeProgram;
    }
) {
    const [some , setSome ] = useState<any>();
    const {user} = userStore();
    const [trainer_trainee_program , setTrainerTraineeProgram] = useState<TTrainerTraineeProgram>({
        start_date:getCurrentShortTime(),
        trainee_id:trainee.id,
        trainer_id:user?.id
    });

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log({type_target:e.target.type , type:e.type});
    }

    console.log({trainer_trainee_program});
    

  return (
    <form dir='rtl' className='w-[350px] md:w-[500px] h-fit pb-4 gap-3 bg-white flex flex-col items-center border border-black shadow-lg rounded-2xl text-background'>
        <div className="mt-[-20px] flex flex-col items-center">
            <div className="border border-black w-fit rounded-full">
                <UserProfileImg profile_img={trainee.profile_img} />
            </div>
            <h3 className='text-center font-bold'>{trainee.name}</h3>
        </div>

        

        <div className="w-full flex justify-around">
            <div className="flex flex-col items-center">
                <label htmlFor="start">תאריך התחלה</label>
                <input onChange={handleInputChange} type="date" name='start' className='border border-black rounded-sm' />
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="start">תאריך סיום</label>
                <input onChange={handleInputChange} type='date' name='end' className='border border-black rounded-sm' />
            </div>
        </div>

        <div className="flex flex-col w-full px-4">
            <label className='w-full' htmlFor="program_name">שם התוכנית</label>
            <input onChange={handleInputChange} className='w-full border border-black rounded-sm px-2' type="text" name='program_name' />
        </div>

        <div className="flex flex-col w-full px-4">
            <label htmlFor="comment" className='w-full' >הערות</label>
            <textarea name="comment" className='w-full border border-black rounded-sm px-2' ></textarea>
        </div>

        <button
            className='bg-primary rounded-sm mx-4 self-stretch py-1 my-2'
            >שמור תוכנית
        </button>
    </form>
  )
}
