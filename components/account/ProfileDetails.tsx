'use client'
import { userStore } from "@/stores/userStore"
import Link from "next/link";
import { useEffect } from "react";

export default function ProfileDetails() {
  const { user , fetchUser } = userStore();

  useEffect(()=>{fetchUser();},[]);

  return (
    <div className="text">
      { user &&
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-2xl">{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.created_at?.substring(0,10).replaceAll('-',"/")}{" חבר מאז"}</p>
        <Link href={"/account/edit"}>{"עריכה"}</Link>
      </div>
      }
    </div>
  )
}