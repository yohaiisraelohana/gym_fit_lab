"use client"
import { isError } from '@/services/functions/isError';
import { uploadAvatarImage } from '@/services/upload/uploadImage';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'

export default function UploadToSupabaseStorage(
    {user_id}:{
        user_id:string;
    }
) {
    
    const uploadImage = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files![0];
        const res = await uploadAvatarImage(user_id , img , createClientComponentClient());
        console.log(isError(res));
            
    }
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
        <h1 className="title">בדיקה להעלאת תמונה</h1>
        <input 
            onChange={(e)=>uploadImage(e)}
            type="file" name="" id="" />
    </div>
  )
}
