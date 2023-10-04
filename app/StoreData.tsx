"use client"
//! CHECK IF THIS WORKS BECOUSE THERE IS CASE THAT THE USER WILL LOGIN 
//! AND THE SERVER COMP WILL NOT BE AWARRE TO THE AUTH YET
import { userStore } from '@/stores/userStore'
import React, { useEffect } from 'react'

export default function StoreData({id}:{ id:string }) {
    const {fetchUser} = userStore((state)=>state);
    useEffect(()=>{
        if(id)
            fetchUser(id);
    },[id]);
  return (
    <>
    </>
  )
}
