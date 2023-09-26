'use client'
import { useState } from "react";
import MainMenuDropDawn from "./MainMenuDropDawn";
import UserProfileImg from "./UserProfileImg";
import UserMenu from "./UserMenu";
import { AnimatedGradientBorder } from "../reusefull/AnimatedGradientBorder";



export default function RigntNavbar({user} : { user : TUser | null }) {
  const [openUserMenu , setOpenUserMenu ] = useState<boolean>(false)

  return (
    <div className="ml-auto flex gap-2 items-center">
      { false ? (
        <UserProfileImg handleClick={()=>setOpenUserMenu(prev => !prev)}/>
      ) : (
        <AnimatedGradientBorder rounded="5px" >
            <button className="text hover:bg-neutral-800  p-1 px-2 rounded-sm ">Login</button>
        </AnimatedGradientBorder>
      ) }
      
      { openUserMenu && <UserMenu email={user?.email} />}
      <MainMenuDropDawn/>
    </div>
  )
}
