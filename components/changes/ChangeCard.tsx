import BookmarkIcon from '@/assets/icons/BookmarkIcon';
import ChevronLeftIcon from '@/assets/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon';
import CommentIcon from '@/assets/icons/CommentIcon';
import DocumentTextIcon from '@/assets/icons/DocumentTextIcon';
import HeartOutline from '@/assets/icons/HeartOutline';
import ShareIcon from '@/assets/icons/ShareIcon';
import React, { useEffect, useState } from 'react'

type TChange = {
    id ? : string ;
    before? : string ;
    after ? : string ; 
}

export default function ChangeCard(
    { change , is_enable_actions , existChange}:{
        change?:TChange ; 
        is_enable_actions : boolean ; 
        existChange?: TBodyStatus[] ;
    }) {
        const [before_change , setBeforeChange ] = useState<TBodyStatus | null>(null);
        const [after_change , setAfterChange ] = useState<TBodyStatus | null>(null);
        const [ change_show  , setChangeShow ] = useState<string>("לפני");
        useEffect(()=>{
            if(existChange){
                setBeforeChange(existChange[0]);
                setAfterChange(existChange[1]);
            } else if (change) {
                //TODO: Get the changes from supabase
            }
        },[])
  return (
    <div className=' h-[107vw] rounded-sm w-full bg-white shadow-md relative flex flex-col'>
        {before_change 
            && after_change 
            && ( change_show == "לפני" 
               ? <img className='h-[100vw] w-full bg-black/30 text text-center' src={before_change.img_url!} alt="before change" />
               : change_show == "אחרי" 
               ? <img className='h-[100vw] w-full bg-black/30 text text-center' src={after_change.img_url!} alt="תמונת אחרי השינוי" /> 
               : <div className="h-[100vw] w-full"></div> )
        }
        <p className='text top-1 right-2 bg-white/30 px-1 rounded-sm backdrop-blur-sm absolute'>{change_show}</p>
        <div className=" w-full px-[2vw] bg-white h-[7vw] text-black   flex justify-evenly items-center">
            {is_enable_actions ? <ShareIcon classNameStyle='h-6 w-6 cursor-pointer  text-gray-700'/> : <p className='h-6 w-6'></p> }
            {is_enable_actions ? <BookmarkIcon classNameStyle='h-6 w-6 cursor-pointer text-blue-600' /> : <p className='h-6 w-6'></p> }
            <ChevronLeftIcon classNameStyle=' h-6 w-6 cursor-pointer' onClick={()=>setChangeShow("לפני")} />
            <DocumentTextIcon classNameStyle='h-6 w-6 cursor-pointer text-primary' onClick={()=>setChangeShow("פרטים")} />
            <ChevronRightIcon classNameStyle='h-6 w-6 cursor-pointer' onClick={()=>setChangeShow("אחרי")} />
            {is_enable_actions ? <CommentIcon classNameStyle='h-6 w-6 cursor-pointer text-yellow-600' /> : <p className='h-6 w-6'></p> }
            {is_enable_actions ? <HeartOutline classNameStyle='h-6 w-6 cursor-pointer text-red-600' /> : <p className='h-6 w-6'></p> }
        </div>
    </div>
  )
}
