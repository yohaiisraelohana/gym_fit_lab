"use client"
import HeartOutline from "@/assets/icons/HeartOutline";
import HeartSolidIcon from "@/assets/icons/HeartSolidIcon";
import { userStore } from "@/stores/userStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import ChevronUpIcon from "@/assets/icons/ChevronUpIcon";
import LoadingDumbbells from "../common/LoadingDumbbells";
import ChangeCardLikesList from "./ChangeCardLikesList";

export default  function ChangeCardLikes(
    { change_id}:{
        change_id:number;
    }
) {
  const [likes_list , setLikesList] = useState<TLikeUser[]>([]); 
  const {user} = userStore();
  const [ is_liked ,  setIsLiked ] = useState<boolean>(false);
  const [loading , setLoading ] = useState<boolean>(false);
  const [ total_likes , setTotalLikes ] = useState<number>(0);

  const supabase = createClientComponentClient();
  const limit = 20;

  const getLikesList = async () => {
    setLoading(true);
    const {data , error} = await supabase
      .rpc("get_changes_offset",{change_id , skip:likes_list.length , return_limit:limit });

    if (!data || error )
      return setLoading(false) ;
    const likes_data : TLikeUser[] = [...likes_list , ...data ];
    setLoading(false);
    setLikesList(likes_data);
  } 

  const checkIfLiked = async () => {
    if(!user)
      return alert("לייק לשינוי אפשרי רק למשתמשים מחוברים");
    const {data , error} = await supabase
      .from("changeLike")
      .select()
      .match({profile_id:user?.id , item_id:change_id});
    
    if(!data || error)
      return;

    setIsLiked(data.length > 0);
  }

  const countLikes = async () => {
    const { data, count , error } = await supabase
      .from('changeLike')
      .select('*', { count: 'exact', head: true })
      .match({item_id:change_id});
    if(!error && count)
      setTotalLikes(count);
    
  }

  const handleLike = async () => {
    if(!user?.id)
      return alert("פעולה זו לשתמשים רשומים בלבד");
    if(is_liked){
      const { error } = await supabase
          .from("changeLike")
          .delete()
          .match({item_id:change_id,profile_id:user.id});

      if(error)
        return;

      setIsLiked(false);
      setTotalLikes(prev => prev - 1);
    } else {
      const { error } = await supabase
        .from("changeLike")
        .insert({item_id:change_id , profile_id:user.id})

      if(error)
        return;

      setIsLiked(true);
      setTotalLikes(prev => prev + 1);
    }
    getLikesList();
  }

  
  useEffect(()=>{ 
    countLikes();
    checkIfLiked();
    getLikesList(); 
     
  },[]);

  return (
      <div 
        className="h-[94%] w-full flex flex-col  overflow-y-auto items-center  p-2 md:p-4 gap-4 ">
          {loading && <LoadingDumbbells />}
          <div className="flex w-full justify-between ">
            <div className="flex items-center gap-1 ">
              {is_liked 
                ? <HeartSolidIcon onClick={handleLike} classNameStyle="h-6 w-6 text-red-600 cursor-pointer" />
                : <HeartOutline   onClick={handleLike} classNameStyle="h-6 w-6 text-red-600 cursor-pointer"/>
              }
              
              <p className="">{total_likes}</p>
            </div>
            <p className="max-md:bg-red-600 md:hidden w-10 h-4 mr-1"></p>
            <p className="max-md:hidden">לייקים</p>
          </div>
          <ChangeCardLikesList likes_list={likes_list} />
          { likes_list.length >= limit 
            &&
            <button 
              onClick={getLikesList}
              className=" w-full justify-center flex items-center gap-1"
              ><ChevronUpIcon 
                  classNameStyle="h-4 w-4" />
              <p
                className="text-black"
                >טען עוד
              </p>
            </button>
          }
      </div>
  )
}
