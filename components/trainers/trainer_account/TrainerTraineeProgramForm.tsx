import UserProfileImg from '@/components/navbar/UserProfileImg'
import React from 'react'

export default function TrainerTraineeProgramForm(
    {trainee , exist_program}:{
        trainee:TTrainee;
        exist_program?:TTrainerTraineeProgram;
    }
) {
  return (
    <form className='w-[350px] md:w-[30vw] h-fit pb-4 gap-2 bg-white flex flex-col items-center border border-black shadow-lg rounded-2xl text-background'>
        <div className="border border-black w-fit rounded-full mt-[-20px]">
            <UserProfileImg profile_img={trainee.profile_img} />
        </div>

        <h3 className='text-center font-bold'>{trainee.name}</h3>

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
            <label className='w-full' htmlFor="name">שם התוכנית</label>
            <input className='w-full border border-black rounded-sm' type="text" name='name' />
        </div>

        <div className="flex flex-col w-full px-4">
            <label htmlFor="comment" className='w-full' >הערות</label>
            <textarea name="comment" className='w-full border border-black rounded-sm' ></textarea>
        </div>
    </form>
  )
}
