//TODO: navigate to account if profile updated sucessfully 
//! check if the user authenticated before giving him to upload or delete

'use client'
import React, { useEffect, useState } from 'react'
import { userStore } from '@/stores/userStore';
import ProfileForm from './ProfileForm';
import { uploadSingleImgToCloudinary } from '@/services/cloudinary/uploadImage';
import { useRouter } from 'next/navigation';
import { deleteSingleImageFromCloudinary } from '@/services/cloudinary/deleteImage';

export default function EditProfile() {
    const { user , updateUser , error:userError } = userStore();
    const [ error , setError] = useState<TError | null>(null);
    const router = useRouter();
    
    useEffect(()=>{setError(userError)},[userError]);

    const hundleSubmit = async (newUser:TUser, new_profile_img : File | null) => {
      setError(null);
      let profile = {...newUser};

      if (new_profile_img != null) {
        if(profile.profile_img){
          const deleteRes = await deleteSingleImageFromCloudinary(profile.profile_img);
          if(typeof deleteRes !== "string")
            setError(deleteRes);
        }
        const uploadRes : any | TCldRes | TError = await uploadSingleImgToCloudinary(new_profile_img);
        if(!("secure_url" in uploadRes))
          return setError(uploadRes);
        profile.profile_img = uploadRes.secure_url;
      };

      const userRes = await updateUser(profile);

      if(typeof userRes !== "string")
        return;

      router.push('/account');
    }


  return (
    <ProfileForm user={user} error={error} hundleSubmit={hundleSubmit}  />
  )
}


/*
    const updateUser = async ( updatedUser : TUser) => {
      const res = await fetch(EDIT_PROFILE,{
        method:"PUT",
        headers:{
            'Content-Type' : "application/json"
        },
        body:JSON.stringify(updatedUser)
      });
      const data = await res.json();
      console.log({data}); 
    }
*/