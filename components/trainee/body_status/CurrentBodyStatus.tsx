import ChangeCard from '@/components/changes/ChangeCard';
import React from 'react'

export default function CurrentBodyStatus(
    {first_body_status ,last_body_status , is_body_status , profile}:{
        is_body_status:boolean;
        profile:TUser;
        first_body_status:TBodyStatus  | null;
        last_body_status:TBodyStatus  | null;
    }
) {
  return (
    <>
        { is_body_status 
            ? ( <ChangeCard 
                    existProfile={profile}
                    existChange={[first_body_status!,last_body_status!]} 
                    />
            ) : ( 
                <div className="h-[100vw] rounded-sm w-full flex justify-center items-center shadow-md bg-white">
                    <p className='text-black'>מלא סטטוס גוף כדי לראות את השינוי שלך</p>
                    <button></button>
                </div> 
        )}
    </>
  )
}
