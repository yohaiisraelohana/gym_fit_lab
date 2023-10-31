import DumbbelIcon from "@/assets/icons/DumbbelIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import ShareIcon from "@/assets/icons/ShareIcon";
import { useState } from "react";
import SaveExerciseButton from "./BookmarksExerciseButtons";
import { userStore } from "@/stores/userStore";

export default function ExerciseMenu({id}:{id:number}) {
  const [openMenu , setOpenMenue] = useState<boolean>(false);
  const {user} = userStore();

  return (
    <div className="absolute top-1 right-1 flex flex-col gap-2 justify-center items-center ">
        <button
          onClick={()=>(user ? setOpenMenue(!openMenu) : alert("פעולה זאת למשתמשים מחוברים בלבד"))}
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
            <SaveExerciseButton 
              profile_id={user.id!} 
              id={id} 
              classNemeStyle="bg-white/40 hover:bg-green-500/30  backdrop-blur-sm p-1 rounded-md" />
          }
    </div>
  )
}
