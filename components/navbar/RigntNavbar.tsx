'use client'
import { useState } from "react";
import MainMenuDropDawn from "./MainMenuDropDawn";
import UserProfileImg from "./UserProfileImg";
import UserMenu from "./UserMenu";
import { AnimatedGradientBorder } from "../reusefull/AnimatedGradientBorder";
import Link from "next/link";



export default function RigntNavbar({user} : { user : TUser | null }) {
  const [openUserMenu , setOpenUserMenu ] = useState<boolean>(false)

  return (
    <div className="ml-auto flex gap-2 items-center">
      { user ? (
        <UserProfileImg 
          profile_img={user.profile_img} 
          handleClick={()=>setOpenUserMenu(prev => !prev)}/>
      ) : (
        <AnimatedGradientBorder rounded="2px" >
            <Link href={"/login"} className="text hover:bg-neutral-800  p-1 px-2 rounded-sm ">התחבר</Link>
        </AnimatedGradientBorder>
      ) }
      
      { openUserMenu && user && <UserMenu closeUserMenu={()=>setOpenUserMenu(false)} user={user}  />}
      <MainMenuDropDawn/>
    </div>
  )
}
