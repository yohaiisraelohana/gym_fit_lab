import { saveItem, unSaveItem } from "@/app/server-actions/savedActions";
import BookmarkIcon from "@/assets/icons/BookmarkIcon";
import BookmarkSlash from "@/assets/icons/BookmarkSlash";

export default function BookmarksExerciseButtons(
    {id , classNemeStyle , profile_id , afterBookmarkFunction , saved } : { 
      id : number ;
      classNemeStyle:string;
      profile_id? : string ;
      afterBookmarkFunction? : () => void ;
      saved : boolean ;
    }){

      const handleBookmarkClick = () => {
        if(!profile_id)
          return alert("שמירת תרגילים אפשרית למשתמשים מחוברים בלבד");
        if(saved){
          unSaveItem(id,"savedExercises",profile_id);
        } else {
          saveItem(id,"savedExercises",profile_id);
        }
        if(afterBookmarkFunction)
          afterBookmarkFunction();
      }

  return (
    <button 
         onClick={handleBookmarkClick}
         className={classNemeStyle}
          >{ saved 
            ? <BookmarkSlash classNameStyle="h-5 w-5"/>
            : <BookmarkIcon classNameStyle="h-5 w-5" />}
    </button>
  )
}
