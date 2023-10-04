"use client"

import { userStore } from '@/stores/userStore'
import React, { useEffect } from 'react'

export default function StoreData({auth}:{ auth:any }) {
    const {fetchUser} = userStore((state)=>state);

    useEffect(()=>{
        if(auth)
            fetchUser(auth);
    },[])
  return (
    <>
    </>
  )
}
