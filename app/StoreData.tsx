"use client"
//! CHECK IF THIS WORKS BECOUSE THERE IS CASE THAT THE USER WILL LOGIN 
//! AND THE SERVER COMP WILL NOT BE AWARRE TO THE AUTH YET
import { userStore } from '@/stores/userStore'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect } from 'react'

export default function StoreData() {
    const {fetchUser , user} = userStore((state)=>state);
    const supabase = createClientComponentClient();
    
    const getAuthUser = async () => {
      const auth = await supabase.auth.getUser();
      if (auth.data.user) {
        fetchUser(auth.data.user.id);
      };
    }
       
    useEffect(()=>{
      getAuthUser();
    },[]);
  return (
    <>
    </>
  )
}
