import DumbbelIcon from "@/assets/icons/DumbbelIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import ShareIcon from "@/assets/icons/ShareIcon";
import { useState } from "react";
import BookmarksExerciseButtons from "./BookmarksExerciseButtons";
import { userStore } from "@/stores/userStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ExerciseMenu({id}:{id:number}) {
  const [openMenu , setOpenMenue] = useState<boolean>(false);
  const [ saved , setSaved ] = useState<boolean>(false);
  const {user} = userStore();
  const supabase = createClientComponentClient();

  const handleOpenMenu = async () => {
    if(!user)
      return  alert("פעולה זאת למשתמשים מחוברים בלבד");
    const {data , error} = await supabase
      .from("saved")
      .select()
      .match({item_id:id,profile_id:user.id});
    console.log({data,error});
    if(!data)
      return;
    setSaved(data.length > 0);
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
          <DumbbelIcon classNameStyle="h-5 w-5 " />,
          <ShareIcon classNameStyle="h-5 w-5 " />,
          ].map((icon,ind)=>(
            <div 
              key={ind}
              className="bg-white/40 hover:bg-green-500/30  backdrop-blur-sm p-1 rounded-md"
              >{icon}
            </div>
          ))}

          {
            openMenu && user &&
              <BookmarksExerciseButtons               
                  classNemeStyle="bg-white/40 hover:bg-green-500/30  backdrop-blur-sm p-1 rounded-md" 
                  afterBookmarkFunction={()=>setOpenMenue(false)}
                  profile_id={user.id!} 
                  saved={saved}
                  id={id} />
          }
    </div>
  )
}