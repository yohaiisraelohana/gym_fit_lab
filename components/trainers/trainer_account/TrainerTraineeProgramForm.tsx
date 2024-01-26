import UserProfileImg from '@/components/navbar/UserProfileImg'
import React, {  useState } from 'react'

export default function TrainerTraineeProgramForm(
    {trainee , exist_program}:{
        trainee:TTrainee;
        exist_program?:TTrainerTraineeProgram;
    }
) {
    
    const [trainer_trainee_program , setTrainerTraineeProgram] = useState<TTrainerTraineeProgram>();
    // ! start date will be the currant day date getCurrentShortTime();
  return (
    <form className='w-[350px] md:w-[500px] h-fit pb-4 gap-3 bg-white flex flex-col items-center border border-black shadow-lg rounded-2xl text-background'>
        <div className="mt-[-20px] flex flex-col items-center">
            <div className="border border-black w-fit rounded-full">
                <UserProfileImg profile_img={trainee.profile_img} />
            </div>
            <h3 className='text-center font-bold'>{trainee.name}</h3>
        </div>

        

        <div className="w-full flex justify-around">
            <div className="flex flex-col items-center">
                <label htmlFor="start">תאריך התחלה</label>
                <input type="date" name='start' className='border border-black rounded-sm' />
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="start">תאריך סיום</label>
                <input type='date' name='end' className='border border-black rounded-sm' />
            </div>
        </div>

        <div className="flex flex-col w-full px-4">
            <label className='w-full' htmlFor="program_name">שם התוכנית</label>
            <input className='w-full border border-black rounded-sm' type="text" name='program_name' />
        </div>

        <div className="flex flex-col w-full px-4">
            <label htmlFor="comment" className='w-full' >הערות</label>
            <textarea name="comment" className='w-full border border-black rounded-sm' ></textarea>
        </div>

        <button
            className='bg-primary rounded-sm mx-4 self-stretch py-1 my-2'
            >שמור תוכנית
        </button>
    </form>
  )
}
