import { saveItem } from "@/app/server-actions/savedActions";
import BookmarkIcon from "@/assets/icons/BookmarkIcon";

export default function SaveExerciseButton(
    {id , classNemeStyle , profile_id } : { 
      id : number ;
      classNemeStyle:string;
      profile_id : string ;
    }){

  return (
    <button 
        onClick={()=>saveItem(id,"exercise",profile_id) }
        className={classNemeStyle}
         ><BookmarkIcon classNameStyle="h-5 w-5" />
    </button>
  )
}
