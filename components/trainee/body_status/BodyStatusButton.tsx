import { SetStateAction ,Dispatch } from "react";

export default function BodyStatusButton(
    {is_body_status , is_valid_change , loading , change_data , publishChange , findTrainers ,setShownDetails}:{
        is_body_status:boolean;
        is_valid_change:boolean;
        loading:boolean;
        change_data:TChange;

        publishChange:() => void;
        findTrainers:() => void;
        setShownDetails: Dispatch<SetStateAction<string>>;
    }) {
  return (
    <button 
    disabled={!is_body_status || !is_valid_change || loading}
    style={(!is_body_status || !is_valid_change || loading) ?  {opacity:'0.3'} : {}}
    onClick={()=>{
        if(change_data.after_id){
            if(change_data.trainer_id)
                return publishChange() ;

            return findTrainers();
        }
        setShownDetails("פרסם שינוי");
    }}
    className="text-black bg-primary w-full p-1 rounded-sm mb-1">
        {!change_data.after_id 
            ? "פרסם"
            : change_data.trainer_id 
                ? "שמור"
                : "המשך"
        }
    </button>
  )
}
