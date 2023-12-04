"use client"
import CommentIcon from '@/assets/icons/CommentIcon';
import React, { useEffect, useState } from 'react'
import ChangeCardCommentFrom from './ChangeCardCommentFrom';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import LoadingDumbbells from '../reusefull/LoadingDumbbells';
import ChangeCardCommentsList from './ChangeCardCommentsList';
import ChevronUpIcon from '@/assets/icons/ChevronUpIcon';
import { userStore } from '@/stores/userStore';

export default function ChangeCardComments(
    {change_id }:{
      change_id:number;
    }) {
    const [ isOpenCommentForm , setIsOpenCommentForm ] = useState<boolean>(false);
    const [ comments_list , setCommentsList ] = useState<TCommentUser[]>([]);
    const [ total_commets , setTotalComments ] = useState<number>(0);
    const [loading  , setLoading ] = useState<boolean>(false);
    const {user} = userStore();

    const limit = 20 ; 
    const supabase  =  createClientComponentClient();

    const getChangeComments = async () => {
      setLoading(true);
      const {data , error} = await supabase
        .rpc("get_changes_offset_comments",{change_id , skip:comments_list.length , return_limit:limit});

      if(error)
        return setLoading(false);
      
      setCommentsList([...comments_list , ...data]);
      setLoading(false);
    }
    const countComments = async () => {
      const { data, count , error } = await supabase
        .from('changeComment')
        .select('*', { count: 'exact', head: true })
        .match({item_id:change_id});
      if(!error && count)
        setTotalComments(count);
      
    }
    useEffect(()=>{
      getChangeComments(); 
      countComments();
    },[]);
    console.log(comments_list);
    
  return (
    <div className="h-[94%] w-full flex flex-col  overflow-y-auto items-center  p-2 md:p-4 gap-4">
      {loading && <LoadingDumbbells />}
      <div className="flex w-full justify-between ">
        <div className="flex items-center gap-1 ">
          <CommentIcon 
            onClick={()=>setIsOpenCommentForm(prev => !prev)}
            classNameStyle='h-6 w-6 text-yellow-600 cursor-pointer' /> 
          <p className="">{total_commets}</p>
        </div>
        <p className="max-md:bg-yellow-600 md:hidden w-11 h-4 mr-1"></p>
        <p className="max-md:hidden">לייקים</p>
      </div>
      {isOpenCommentForm 
        && <ChangeCardCommentFrom 
          addComment={(comment:TComment) => {
            setCommentsList(prev => [{...comment , profile_img:user?.profile_img! , name:user?.name! } , ...prev]);
            setIsOpenCommentForm(false);
            setTotalComments(prev => prev + 1);
          }}
          profile_id={user?.id}
          item_id={change_id}/>}
      <ChangeCardCommentsList 
        user_id={user?.id}
        comments_list={comments_list}
        removeComment={(id:number)=>{          
          setCommentsList(comments_list.filter(c => c.id != id));
          setTotalComments(prev => prev - 1);
        }} />
      {comments_list.length >= limit 
        && 
        <button
          onClick={getChangeComments}
          className=" w-full justify-center flex items-center gap-1"
          ><ChevronUpIcon 
          classNameStyle="h-4 w-4" />
          <p
            className="text-black"
            >טען עוד
          </p>
        </button> }
    </div>
  )
}
