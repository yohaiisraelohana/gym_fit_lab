import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import { activity_options } from "../calculators/activityOptions";
import UserProfileImg from "../navbar/UserProfileImg";
import ChevronUpIcon from "@/assets/icons/ChevronUpIcon";

export default function ChangeDetails(
    {change_profile , before_change , after_change }:{
        change_profile : TUser;
        before_change : TBodyStatus ;
        after_change : TBodyStatus ;
    }) {
  return (
    <div className="h-[100vw] w-full flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col items-center">
            <UserProfileImg profile_img={change_profile.profile_img} handleClick={()=>console.log("")} />
            <h2 className='text-xl'>{change_profile.name}</h2>
        </div>
        <div className="w-full grid grid-cols-2 gap-y-3">
            
            <h2 className="text-lg text-center font-bold">{"אחרי"}</h2>
            <h2 className="text-lg text-center font-bold">{"לפני"}</h2>

            <p className="text-center">{after_change.created_at}</p>
            <p className="text-center">{before_change.created_at}</p>

            <div className="flex w-full justify-center gap-1">
                <p>ק״ג</p>
                <p className="text-center">{after_change.weight}</p>
            </div>
            <div className="flex w-full justify-center gap-1">
                <p>ק״ג</p>
                <p className="text-center">{before_change.weight}</p>
            </div>
            
            <div className="flex w-full justify-center gap-1">
                <p>ס״מ</p>
                <p className="text-center">{after_change.height}</p>
            </div>
            <div className="flex w-full justify-center gap-1">
                <p>ס״מ</p>
                <p className="text-center">{before_change.height}</p>
            </div>

            <p className="text-center">גיל {after_change.age}</p>
            <p className="text-center">גיל {before_change.age}</p>

            <p className="text-center">{after_change.target}</p>
            <p className="text-center">{before_change.target}</p>

            <p className="text-center">פעילות {activity_options[ after_change.activity!].name}</p>
            <p className="text-center">פעילות {activity_options[before_change.activity!].name}</p>

        </div>
        <button 
            className="w-full text-center flex justify-center items-center gap-1"
            ><ChevronUpIcon classNameStyle="h-4 w-4 " /> <p>היקפים</p> 
        </button>
    </div> 
  )
}
