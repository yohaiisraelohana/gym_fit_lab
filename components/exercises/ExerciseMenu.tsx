"use client"
import PlusIcon from "@/assets/icons/PlusIcon";
import ShareIcon from "@/assets/icons/ShareIcon";
import { useState } from "react";
import BookmarksExerciseButtons from "./BookmarksExerciseButtons";
import { userStore } from "@/stores/userStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { WhatsappShareButton } from "react-share";
import { MainUrl } from "@/constants/url";
import Link from "next/link";
import DocumentTextIcon from "@/assets/icons/DocumentTextIcon";


export default function ExerciseMenu({id}:{id:number}) {
  const [openMenu , setOpenMenue] = useState<boolean>(false);
  const [ saved , setSaved ] = useState<boolean>(false);
  const {user} = userStore();

  const supabase = createClientComponentClient();
  const share_url = MainUrl + "/exercises/" + id ;

  const handleOpenMenu = async () => {
    if(user){
      const {data } = await supabase
        .from("savedExercises")
        .select()
        .match({item_id:id,profile_id:user.id});

      if(data)
        setSaved(data.length > 0);
    }
    setOpenMenue(!openMenu);
  }

  


  return (
    <div className="absolute top-1 right-1 flex flex-col gap-2 justify-center items-center ">
        <button
          style={{rotate:openMenu ? "45deg" : "0deg" , transition:'all 300ms linear'}}
          onClick={handleOpenMenu}
          ><PlusIcon classNameStyle="h-6 w-6 text-primary " />
        </button>

        {openMenu && [
          <Link href={`/exercises/${id}`}>
            <DocumentTextIcon classNameStyle="h-5 w-5 " />
          </Link>,

          <WhatsappShareButton
            title="מצאתי תרגיל שיעניין אותך"
            url={share_url}
            className="h-fit w-5"
            ><ShareIcon classNameStyle="h-5 w-5 " />
          </WhatsappShareButton> ,

          <BookmarksExerciseButtons               
            classNemeStyle="bg-white/40  backdrop-blur-sm  rounded-md" 
            afterBookmarkFunction={()=>setOpenMenue(false)}
            profile_id={user?.id} 
            saved={saved}
            id={id} />

          ].map((icon,ind)=>(
            <div 
              key={ind}
              className="bg-white/40 hover:bg-green-500/30  backdrop-blur-sm p-1 rounded-md h-fit flex items-center"
              >{icon}
            </div>
          ))}

    </div>
  )
}
