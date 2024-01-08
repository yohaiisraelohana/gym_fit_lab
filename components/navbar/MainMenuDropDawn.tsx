'use client'

import { useState } from "react"
import { mainMenu } from "./menuOptions";
import Link from "next/link";

export default function MainMenuDropDawn() {
    const [ openMenu , setOpenMenu ] = useState<boolean>(false);
  return (
    <div className="md:hidden ">
        <svg 
            onClick={()=>setOpenMenu(prev => !prev)}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-7 h-7 text" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        {openMenu &&
            <div 
                className="absolute top-16 left-0 text-xl flex flex-col px-4 w-full bg-background shadow-md shadow-white py-1 rounded-b-md">
                {mainMenu.map((menuItem) => (
                    <Link 
                        onClick={()=>setOpenMenu(false)}
                        href={menuItem.href} 
                        key={menuItem.name}
                        className="text-hover text-end p-1  w-full hover:bg-neutral-800 rounded-sm"
                        >{menuItem.name}
                    </Link>
                ))}
            </div>}
    </div>
  )
}
