"use client"
import { useEffect, useState } from "react";
import { activity_options } from "../calculators/activityOptions";
import UserProfileImg from "../navbar/UserProfileImg";
import ChangeCircumferencesDetails from "./ChangeCircumferencesDetails";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ChangeCardDetails(
    {change_profile , before_change , after_change , change ,change_show ,is_exist_change }:{
        change_profile : TUser | null;
        before_change : TBodyStatus ;
        after_change : TBodyStatus ;
        change?:TChange;
        change_show:string;
        is_exist_change:boolean;
    }) {
        const [show_circ , setShowCirc ] = useState<boolean>(false);
        const [trained_by , setTrainedBy ]  = useState<TUser[] | null>(null);

        const getTrainers = async () => {
            if(!change || !change.trainer_id || change.trainee_id?.length == 0)
                return;
            const supabase = createClientComponentClient();
            const {data , error} = await supabase
                .from("profile")
                .select()
                .in("id",change.trainer_id);
            if (!data || error ) 
                return;
            setTrainedBy(data);
        }

        useEffect(()=>{ getTrainers(); },[]);
  return (
    <>
    {  change_show == "פרטים"
        && (( before_change  &&  after_change &&  change_profile)
        ?
    (<div className=" h-[94%]  overflow-scroll py-4 w-full flex flex-col gap-[1%]  justify-center items-center">
        <div className="flex flex-col items-center ">
            <UserProfileImg profile_img={change_profile.profile_img} handleClick={()=>console.log("")} />
            <h2 className='text-xl'>{change_profile.name}</h2>
            {trained_by && trained_by.length > 0 &&
                <div className="flex">
                    <p>אומן על ידי </p>
                    {trained_by
                        .map((trainer)=>(
                            <p>{trainer.name}</p>
                        ))}
                </div>
            }
        </div>
        
        { !show_circ && 
        <div className="w-full grid grid-cols-2 gap-y-[1%] h-full">
            
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

        </div>}
        <ChangeCircumferencesDetails 
            setShowCirc={(s)=>setShowCirc(s)}
            show_circ={show_circ} 
            before_circ_id={before_change.id!} 
            after_circ_id={after_change.id!} />
    </div>
    ) : (
        is_exist_change
        ? <div className="h-[94%] w-full bg-white text-background text-center pt-[40%] px-6">{"לא קיימים נתונים לאחרי השינוי , הזן מינימום שני סטטוסי גוף בתאריכים שונים"}</div>
        : <div className="h-[94%] w-full bg-white text-background text-center pt-[40%] px-6">{"שגיאה בקבלת שינוי "}</div>
        ) 
    )}
    </>
  )
}
