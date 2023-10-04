'use client'
import { userStore } from "@/stores/userStore"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export default function ProfileDetails() {
  const { user , fetchUser } = userStore();
  const supabase = createClientComponentClient();

  const getUser = async () => {
    const {data:auth} = await supabase.auth.getUser();
    if (!auth.user) 
        return;
    fetchUser(auth.user?.id);
  }
  
  useEffect(()=>{
    getUser();
  },[]);

  return (
    <div className="text">
      { user &&
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-2xl">{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.created_at?.substring(0,10).replaceAll('-',"/")}{" חבר מאז"}</p>
      </div>}
    </div>
  )
}