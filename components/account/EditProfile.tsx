'use client'
import React, { useEffect, useState } from 'react'
import { userStore } from '@/stores/userStore';
import ProfileForm from './ProfileForm';
import { useRouter } from 'next/navigation';
import LoadingDumbbells from '../reusefull/LoadingDumbbells';
import {  uploadUniqueImgToIdFolder } from '@/services/upload/uploadImage';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { isError } from '@/services/functions/isError';

export default function EditProfile() {
    const { user , updateUser , error:userError } = userStore();
    const [ error , setError] = useState<TError | null>(null);
    const [loading , setLoading ] = useState<boolean>(false);
    const router = useRouter();
  
    
    useEffect(()=>{
      if(!user){
        setError(userError);
        router.push("/login");
      }
      },[userError,user]);

    const hundleSubmit = async (newUser:TUser, new_profile_img : File | null) => {
      setLoading(true);
      setError(null);
      if(!newUser.name || newUser.name.length == 0)
        return setError({error:"name is required" , message:"שדה שם משתמש הינו חובה"});
      
      let profile = {...newUser};

      if (new_profile_img != null) {
        const upload_image_res = await uploadUniqueImgToIdFolder(user!.id!,"avatars",new_profile_img,createClientComponentClient() , user?.profile_img!) //uploadAvatarImage( user!.id! , new_profile_img , createClientComponentClient() );
        if(isError(upload_image_res))
          return setError(upload_image_res);
        profile.profile_img = upload_image_res;
      };

      const userRes = await updateUser(profile);

      if(isError(userRes)){
        setError(userRes);
        setLoading(false);
        return ;
      }
      setLoading(false);
      router.push('/account');
    }


  return (
    <>
      {loading && <LoadingDumbbells/>}
      <ProfileForm user={user} error={error} hundleSubmit={hundleSubmit}  />
    </>
    
  )
}


/*
      if (new_profile_img != null) {
        if(profile.profile_img){
          const deleteRes = await deleteSingleImageFromCloudinary(profile.profile_img);
          if(typeof deleteRes !== "string"){
            setError(deleteRes);
            setLoading(false);
            return;
          };
        }
        const uploadRes : any | TCldRes | TError = await uploadSingleImgToCloudinary(new_profile_img);
        if(!("secure_url" in uploadRes)){
          setError(uploadRes);
          setLoading(false);
          return;
        }
        profile.profile_img = uploadRes.secure_url;
      };
*/