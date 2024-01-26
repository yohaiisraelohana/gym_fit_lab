"use client"
import { Modal } from '@/components/common/Modal';
import React, { useState } from 'react'
import TrainerTraineeProgramForm from './TrainerTraineeProgramForm';
import ProfileIcon from '@/assets/icons/ProfileIcon';

export default function TrainerTraineeRequestCard(
    {trainee}:{
        trainee:TTrainee
    }) {
    const [is_open , setIsOpen] = useState<boolean>(false);

  return (

    <div 
        dir='rtl'
        className="w-full flex justify-between py-2 text">
        <Modal
            isOpen={is_open}
            setIsOpen={setIsOpen}>
            <TrainerTraineeProgramForm trainee={trainee} />
        </Modal>

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
                onClick={()=>setIsOpen(true)}
                className='text-primary'
                >{"קבל"}
            </button>
            <button
                className='text-red-600'
                >{"דחה"}
            </button>
        </div>
                        

    </div>
  )
}
