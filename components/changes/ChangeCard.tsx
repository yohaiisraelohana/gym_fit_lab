import BookmarkIcon from '@/assets/icons/BookmarkIcon';
import ChevronLeftIcon from '@/assets/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon';
import CommentIcon from '@/assets/icons/CommentIcon';
import DocumentTextIcon from '@/assets/icons/DocumentTextIcon';
import HeartOutline from '@/assets/icons/HeartOutline';
import ShareIcon from '@/assets/icons/ShareIcon';
import React, { useEffect, useState } from 'react'
import ChangeDetails from './ChangeDetails';

type TChange = {
    id ? : string ;
    before? : string ;
    after ? : string ; 
}

export default function ChangeCard(
    { change ,  existChange , existProfile }:{
        change?:TChange ; 
        existChange?: TBodyStatus[] ;
        existProfile?: TUser ;
    }) {
        const [before_change , setBeforeChange ] = useState<TBodyStatus | null>(null);
        const [after_change , setAfterChange ] = useState<TBodyStatus | null>(null);
        const [change_profile , setChangeProfile ] = useState<TUser | null>(null);
        const [ change_show  , setChangeShow ] = useState<string>("לפני");
        const [is_exist_change , setIsExistChange] = useState<boolean>(false);
        useEffect(()=>{
            if(existChange && existProfile){
                setBeforeChange(existChange[0]);
                setAfterChange(existChange[1]);
                setChangeProfile(existProfile);
                setIsExistChange(true);
            } else if (change) {
                //TODO: Get the changes from supabase
                //TODO: if the change length less chan 2 return a message without the change details 
                //TODO: also if the is no details about the profile of the change user
            }
        },[])
  return (
    <div className=' h-[107vw] justify-between rounded-sm w-full bg-white shadow-md relative flex flex-col'>
        {   
            change_show == "לפני"  
            && before_change 
            && <img className='h-[100vw] w-full bg-black/30 text text-center' src={before_change.img_url!} alt="before change" /> 
        }

        {
            change_show == "אחרי"
            &&
            (is_exist_change 
                ? (after_change
                    ? <img className='h-[100vw] w-full bg-black/30 text text-center' src={after_change.img_url!} alt="תמונת אחרי השינוי" /> 
                    : <div className="h-[100vw] w-full bg-white text-background text-center pt-[40%] px-6">{"לא קיימים נתונים לאחרי השינוי , הזן מינימום שני סטטוסי גוף בתאריכים שונים"}</div>)
                : after_change && <img className='h-[100vw] w-full bg-black/30 text text-center' src={after_change.img_url!} alt="תמונת אחרי השינוי" /> )
        }

        {
            change_show == "פרטים"
            && (( before_change  &&  after_change &&  change_profile)
            ? <ChangeDetails change_profile={change_profile} before_change={before_change!} after_change={after_change!} />
            : (is_exist_change
                ? <div className="h-[100vw] w-full bg-white text-background text-center pt-[40%] px-6">{"לא קיימים נתונים לאחרי השינוי , הזן מינימום שני סטטוסי גוף בתאריכים שונים"}</div>
                : <div className="h-[100vw] w-full bg-white text-background text-center pt-[40%] px-6">{"שגיאה בקבלת שינוי "}</div>
        ))}


        <p className='text top-1 right-2 bg-white/30 px-1 rounded-sm backdrop-blur-sm absolute'>{change_show}</p>
        <div className=" w-full px-[2vw] bg-white h-[7vw] text-black   flex justify-evenly items-center">
            {!is_exist_change ? <ShareIcon classNameStyle='h-6 w-6 cursor-pointer  text-gray-700'/> : <p className='h-6 w-6'></p> }
            {!is_exist_change ? <BookmarkIcon classNameStyle='h-6 w-6 cursor-pointer text-blue-600' /> : <p className='h-6 w-6'></p> }
            <ChevronLeftIcon classNameStyle=' h-6 w-6 cursor-pointer' onClick={()=>setChangeShow("לפני")} />
            <DocumentTextIcon classNameStyle='h-6 w-6 cursor-pointer text-primary' onClick={()=>setChangeShow("פרטים")} />
            <ChevronRightIcon classNameStyle='h-6 w-6 cursor-pointer' onClick={()=>setChangeShow("אחרי")} />
            {!is_exist_change ? <CommentIcon classNameStyle='h-6 w-6 cursor-pointer text-yellow-600' /> : <p className='h-6 w-6'></p> }
            {!is_exist_change ? <HeartOutline classNameStyle='h-6 w-6 cursor-pointer text-red-600' /> : <p className='h-6 w-6'></p> }
        </div>
    </div>
  )
}
