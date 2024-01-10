"use client"
import React, { useState } from 'react'
import FrontManBodyButtons from './FrontManBodyButtons'
import BackManBodyButtons from './BackManBodyButtons'
import ArrowRightLeftIcon from '@/assets/icons/ArrowRightLeftIcon';

export default function ManBodyButtons(
  {hundleBodyPartSelected , selected_body_part}:{
    hundleBodyPartSelected:(body_part:string)=>void;
    selected_body_part:string;
  }
) {
  const [bodyPartOnMobile , setBodyPartOnMobile] = useState<string>("front");

  
  return (
    <div className="flex  justify-center items-center w-screen md:bg-gradient-to-t md:from-neutral-200 md:to-50% relative border-b-2 border-primary ">
      {/* For Mobile */}
      <div className="md:hidden flex flex-col  ">
        { 
          bodyPartOnMobile == "front"
          ? <FrontManBodyButtons 
              handleBodyPartClick={hundleBodyPartSelected}
              selected_body_part={selected_body_part}/>
          : <BackManBodyButtons
              handleBodyPartClick={hundleBodyPartSelected}
              selected_body_part={selected_body_part}/>
        }
        <ArrowRightLeftIcon 
          onClick={()=>setBodyPartOnMobile(prev => prev == "front" ? "back" : "front")}
          classNameStyle='text-primary absolute h-6 w-6 top-[10%] left-[80%] translate-x-[-50%] cursor-pointer ' />
      </div>

      {/* For Desktop */}
      <div className="max-md:hidden flex ">
        <FrontManBodyButtons 
          selected_body_part={selected_body_part}
          handleBodyPartClick={hundleBodyPartSelected}/>
        <BackManBodyButtons
          selected_body_part={selected_body_part}
          handleBodyPartClick={hundleBodyPartSelected}/>
      </div>
    </div>
  )
}
