"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function ServerRouter({
    redirectPath 
}:{
    redirectPath : string;
}) {
    const router = useRouter();
    useEffect(()=>{
        if(redirectPath)
            router.push(redirectPath);
    },[redirectPath]);
  return (
    <></>
  )
}
