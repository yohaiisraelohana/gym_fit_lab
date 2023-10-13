//TODO: navigate to account if profile updated sucessfully 
'use client'
import { EDIT_PROFILE } from '@/constants/url';
import React, { useEffect, useState } from 'react'
import { userStore } from '@/stores/userStore';
import { isAuth } from '@/services/client/requireAuth/authUser';
import { User } from '@supabase/supabase-js';
import ProfileForm from './ProfileForm';
import { uploadSingleImgToCloudinary } from '@/services/cloudinary/uploadImage';

export default function EditProfile() {
    const { user , fetchUser } = userStore();
    const [error , setError] = useState<TError | null>(null);
    
    const getUser = async () => {
      const auth : User | TError = await isAuth();
      if('error' in auth )
        return;
      fetchUser(auth.id);
    }

    useEffect(()=>{getUser();},[]);

    console.log(user);
    

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

    const uploadNewImage =async (new_profile_img:File) : Promise<string | null> => {
      return "";
    }

    const deleteOldImage =async (public_id:string) => {

    }

    const hundleSubmit = async (newUser:TUser, new_profile_img : File | null) => {
      //! check if the user authenticated
      /*
        * in case the user uploaded new image
        TODO - 1. upload the image 
        TODO - 2. delete the old image if exist
        TODO - 3. update profile_img to the new secure_url/public_id
        TODO - 4. upsate the user
        TODO - 5. navigate to /account
        * in case the user dont change his image 
        TODO - 1. upsate the user
        TODO - 2. navigate to /account    
      */

      let profile = {...newUser};

      //* CHECK IF USER CHANGED IMAGE 
      if (new_profile_img != null) {
        if(profile.profile_img){
          await deleteOldImage(profile.profile_img);
        }
        const uploadRes = await uploadSingleImgToCloudinary(new_profile_img);
        if(!("public_id" in uploadRes))
          return "";//!Error
        profile.profile_img = uploadRes.public_id;
      };

      await updateUser(profile);
    }

  return (
    <ProfileForm user={user} hundleSubmit={hundleSubmit} />
  )
}

/*
//TODO: navigate to account if profile updated sucessfully 
'use client'
import { EDIT_PROFILE } from '@/constants/url';
import React, { useEffect } from 'react'
import { userStore } from '@/stores/userStore';
import { isAuth } from '@/services/client/requireAuth/authUser';
import { User } from '@supabase/supabase-js';
import ProfileForm from './ProfileForm';
import { uploadToCloudinary } from '@/services/cloudinary/uploadImage';

export default function EditProfile() {
    const { user , fetchUser } = userStore();
    
    const getUser = async () => {
      const auth : User | TError = await isAuth();
      if('error' in auth )
        return;
      fetchUser(auth.id);
    }

    useEffect(()=>{getUser();},[]);

    const updateUser = async ( updatedUser : TUser) => {
      const res = await fetch(EDIT_PROFILE,{
        method:"PUT",
        headers:{
            'Content-Type' : "application/json"
        },
        body:JSON.stringify(updatedUser)
      });
      const d = await res.json();

      console.log({d}); 
    }

    const uploadNewImage =async (new_profile_img:File) : Promise<string | null> => {
      try{
        const urlObject = new URL(window.location.href);
        console.log({urlObject});
        
        const response = await fetch(`${urlObject.origin}/api/upload/images`);
        console.log({response});
        
        if(response.ok){
          const { signature } = await response.json();
          //TODO: 1) get the url of the new image uploaded to cloudinary
          console.log(signature);
          
          const cloudinaryRes : any = await uploadToCloudinary(new_profile_img , signature); 
          console.log(cloudinaryRes);
          return cloudinaryRes.secure_url;
        };
        return null;
      } catch(error){
        console.error('Error while uploading the image:', error);
        return null;
      }
    }

    const deleteOldImage =async () => {

    }


    //TODO: 1) check if user is exist end enter the details to inputs
    //TODO: 2) the profile image input will get the url of the exist image profile or null
    const hundleSubmit = async (newUser:TUser, new_profile_img : File | null) => {
        let updatedUser = {...newUser};
        console.log({newUser,new_profile_img});
        
        if(new_profile_img != null){
          const secureUrl = await uploadNewImage(new_profile_img);
          console.log(secureUrl);
          
          if(secureUrl != null){
            await deleteOldImage();
            updatedUser.profile_img = secureUrl;
          }
        }
        await updateUser(updatedUser);        
    }

  return (
    <ProfileForm user={user} hundleSubmit={hundleSubmit} />
  )
}


*/