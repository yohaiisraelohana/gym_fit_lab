import React from 'react'
import UserProfileImg from '../navbar/UserProfileImg';
import TrashIcon from '@/assets/icons/TrashIcon';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';



export default function ChangeCardCommentsList(
    {comments_list , user_id ,removeComment }:{
        comments_list?: TCommentUser[];
        user_id?: string ;
        removeComment:(id:number) => void;
    }) {
        const deleteComment = async (id:number) => {
            const supabase = createClientComponentClient();
            const { error } = await supabase
                .from("changeComment")
                .delete()
                .match({id});
            
            if(!error)
                removeComment(id);
        }
  return (
    <>
        {
            comments_list?.map((comment , ind)=>(
                <div 
                    key={ind}
                    className="w-full flex justify-end px-1">
                    <div 
                        className=" flex gap-2 ">
                        <div 
                            dir='rtl'
                            className="flex justify-between flex-wrap items-center border border-black p-1 rounded-md">
                            <p className=' font-bold  text-black'>{comment.name}</p>
                            {comment.profile_id == user_id 
                                && <TrashIcon 
                                        onClick={()=>deleteComment(comment.id!)}
                                        classNameStyle='h-4 w-4 text-red-600 cursor-pointer' />}
                            <p className='w-full'>{comment.text}</p>
                        </div>
                        <div className="min-w-[37px]">
                            <UserProfileImg 
                                profile_img={comment.profile_img}
                                handleClick={()=>console.log("no action provided")} />
                        </div>
                    </div>
                </div>
            ))
        }
    </>
  )
}
