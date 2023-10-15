'use client'
import ProfileIcon from "@/assets/icons/ProfileIcon";
import { userStore } from "@/stores/userStore"
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ProfileDetails() {
  const { user , fetchUser } = userStore();

  useEffect(()=>{fetchUser();},[]);

  return (
    user &&
      <div className="flex flex-col justify-center items-center">
        {user.profile_img ?
                <Image
                style={{border:'1px solid white', borderRadius:"100%"}}
                height={200}
                width={200}
                alt="profile img"
                src={user.profile_img }/>
                :
                <ProfileIcon classNameStyle="h-[200px] w-[200px] p-[0.35rem] border border-primary rounded-full text" />
        }

        <h1 className=" text-2xl">{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.created_at?.substring(0,10).replaceAll('-',"/")}{" חבר מאז"}</p>
        <p>{user.gender}</p>
        <Link href={"/account/edit"}>{"עריכה"}</Link>
      </div>
  )
}