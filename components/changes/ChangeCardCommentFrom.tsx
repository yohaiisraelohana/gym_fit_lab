"use client"
import SendIcon from "@/assets/icons/SendIcon";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import LoadingDumbbells from "../reusefull/LoadingDumbbells";

export default function ChangeCardCommentFrom(
    {item_id , profile_id ,addComment }
    :TComment & {addComment:(comment:TComment)=>void}
  ){
  const supabase = createClientComponentClient();
  const [ loading , setLoading ] = useState<boolean>(false);

  const handleSendComment = async (text:string) => {
    setLoading(true);

    const {data , error} = await supabase
      .from("changeComment")
      .insert({item_id , profile_id , text})
      .select();
    
    if(error || !data )
      return setLoading(false);
    addComment(data[0]);
    setLoading(false);
  }
  return (
    <form 
      onSubmit={(e)=>{
        e.preventDefault();
        if(!profile_id)
          return alert("פרסום תגובה על שינוי אפשרית למשתמשים רשומים בלבד");
        const formData = new FormData(e.currentTarget);
        const text : string = String(formData.get('text'));
        if(text != "       " && text.length < 150)
          handleSendComment(text.substring(7));
      }}
      className="w-[90%] border border-black h-fit min-h-[100px] p-1 relative"
      >
      {loading && <LoadingDumbbells />}
      <button
        type='submit'
        className="absolute right-1 top-1"
        > <SendIcon classNameStyle=" text-primary h-6 w-6 " />
      </button> 
      <textarea 
        onChange={(e)=>{
          if(e.target.value.length < 8) 
            e.target.value = "       ";  
        }}
        dir="rtl"
        defaultValue={"       "}
        name="text" 
        className="border-0 w-full min-h-full outline-none"/>
      
    </form>
  )
}
