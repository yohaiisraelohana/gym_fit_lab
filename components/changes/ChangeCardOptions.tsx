"use client"
import PhotoIcon from '@/assets/icons/PhotoIcon';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';
import ChevronLeftIcon from '@/assets/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon';
import CommentIcon from '@/assets/icons/CommentIcon';
import DocumentTextIcon from '@/assets/icons/DocumentTextIcon';
import HeartOutline from '@/assets/icons/HeartOutline';
import ShareIcon from '@/assets/icons/ShareIcon';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { userStore } from '@/stores/userStore';
import BookmarkSlash from '@/assets/icons/BookmarkSlash';
import { WhatsappShareButton } from 'react-share';
import { saveItem, unSaveItem } from '@/app/server-actions/savedActions';
import { MainUrl } from '@/constants/url';

export default function ChangeCardOptions(
    { is_exist_change , setChangeShow , change_id}:{
        is_exist_change:boolean;
        setChangeShow:(s:string)=>void;
        change_id?: number;
    }) {
      const [isSaved , setIsSaved ] = useState<boolean>(false);
      const {user} = userStore();

      
      const share_url = MainUrl + "/changes/" + change_id; 
      const checkIfSaved = async () => {
        
        if(!user || is_exist_change)
          return;
        const supabase  =  createClientComponentClient();
        const {data , error} = await supabase
          .from("savedChanges")
          .select()
          .match({profile_id:user.id ,item_id:change_id })
        if(!data || error)
          return;
        setIsSaved(data.length != 0);
      };
      const handleSaveChange = async () => {
        if(!user)
          return alert("שמירת שינויים אפשרית למשתמשים רשומים בלבד");

        if(isSaved){
          const error = await unSaveItem(change_id!,"savedChanges",user.id!);
          if(!error)
            setIsSaved(false);
        } else {
          const error = await saveItem(change_id!,"savedChanges",user.id!);
          if(!error)
            setIsSaved(true);
        }
        
      }
      
      useEffect(()=>{ 
        if(!user)
          return;  
        checkIfSaved(); 
      },[user])
  return (
    <div className=" w-full px-[2vw] bg-white h-[6%]   text-black   flex justify-evenly items-center">
    {!is_exist_change 
      ? <WhatsappShareButton 
          url={share_url}
          title='מצאתי שינוי שיעניין אותך'
          className='h-[80%] w-6'>
          <ShareIcon classNameStyle='h-full w-6 cursor-pointer  text-gray-700'/>
        </WhatsappShareButton>
      : <p className='h-6 w-6'></p> }
    {!is_exist_change 
      ? (
        isSaved 
        ? <BookmarkSlash onClick={handleSaveChange} classNameStyle='h-[80%] w-6 cursor-pointer text-blue-600' />
        : <BookmarkIcon onClick={handleSaveChange} classNameStyle='h-[80%] w-6 cursor-pointer text-blue-600' />
    ) : <p className='h-6 w-6'></p> }

    <ChevronLeftIcon 
      classNameStyle=' h-[80%] w-6 cursor-pointer md:hidden' 
      onClick={()=>setChangeShow("לפני")} />

    <PhotoIcon 
      classNameStyle='h-[80%] w-6 cursor-pointer max-md:hidden' 
      onClick={()=>setChangeShow("לפני")} />

    <DocumentTextIcon 
      classNameStyle='h-[80%] w-6 cursor-pointer text-primary ' 
      onClick={()=>{ setChangeShow("פרטים"); }} />

    <ChevronRightIcon 
      classNameStyle='h-[80%] w-6 cursor-pointer md:hidden' 
      onClick={()=>setChangeShow("אחרי")} />

    {!is_exist_change 
      ? <CommentIcon 
          onClick={()=>setChangeShow("תגובות")}
          classNameStyle='h-[80%] w-6 cursor-pointer text-yellow-600' /> 
      : <p className='h-6 w-6'></p> 
    }
    
    {!is_exist_change 
      ? <HeartOutline 
          onClick={()=>setChangeShow("לייקים")} 
          classNameStyle='h-[80%] w-6 cursor-pointer text-red-600' /> 
      : <p className='h-6 w-6'></p> 
    }
</div>
  )
}
