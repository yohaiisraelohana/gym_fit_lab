"use client"
import PlusIcon from "@/assets/icons/PlusIcon";
import { useState } from "react";
import BodyStatusFrom from "./BodyStatusFrom";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MinusIcon from "@/assets/icons/MinusIcon";
import { revalidatePath } from "next/cache";
import ChangeCard from "../changes/ChangeCard";
import EditIcon from "@/assets/icons/EditIcon";

export default function BodyStatus(
        {body_status , profile_id }:{
            body_status : TBodyStatus[] | null;
            profile_id : string ;
        }) {
    const supabase = createClientComponentClient();
    const [is_body_status_form , setIsBodyStatusFrom] = useState<boolean>(false);//!set to false
    const is_body_status = body_status && body_status.length > 0;
    const first_body_status = is_body_status ? body_status[0] : null;
    const last_body_status = is_body_status && body_status.length > 1 ? body_status[body_status.length -1] : null;
    const current_date = new Date().toISOString().substring(0,10);
    console.log({first_body_status , last_body_status});
    
    const saveBodyStatus = async (body_status_data : TBodyStatus ,  circumferenceForm : TBodycircumference | null ) => {
        let circ_id : string | null = null;
        if(circumferenceForm){          
            const {data , error} = await supabase
                .from("circumferences")
                .upsert({
                    ...circumferenceForm,
                    id:body_status_data.circumferences
                },{
                    onConflict:"id"
                })
                .select();
            console.log({data,error});
            
            if(!error && data )
                circ_id = "id" in data[0] ? data[0].id : null ; 
        }

        const {data , error} = await supabase
            .from("body_status")
            .upsert(
                {
                    img_url:body_status_data.img_url,
                    target:body_status_data.target,
                    activity:body_status_data.activity,
                    age:body_status_data.age,
                    height:body_status_data.height,
                    weight:body_status_data.weight, 
                    created_at:current_date,
                    profile_id,
                    circumferences:circ_id
                },{onConflict:"created_at"})
            .select();
        console.log({data,error});
        setIsBodyStatusFrom(false);
        //revalidatePath("/account/trainee"); 
        //!revalidate not working
    }
  return (
    <section className="flex flex-col gap-2 w-[77vw] rounded-md  ">
        <div className=" w-full flex justify-between items-center">
            <div className="flex gap-2">
                {is_body_status_form 
                    ? <MinusIcon 
                        onClick={()=>setIsBodyStatusFrom(false)}
                        classNameStyle="border border-white text h-5 w-5 cursor-pointer" /> 
                    : <PlusIcon 
                        onClick={()=>setIsBodyStatusFrom(true)}
                        classNameStyle="border border-white text h-5 w-5 cursor-pointer "/>
                }
                <EditIcon classNameStyle="h-5 w-5 border border-white text  cursor-pointer" />
            </div>
            <h1 className=" text-xl text">{"השינוי הנוכחי"}</h1>
        </div>
        {/* Here will be a change component from type client */}
        {is_body_status_form ? 
            <BodyStatusFrom saveBodyStatus={saveBodyStatus} last_body_status={last_body_status}/>
            :
            ( is_body_status ? (
                <ChangeCard 
                    existChange={[first_body_status!,last_body_status!]} 
                    is_enable_actions={false}
                    />
                ) : ( 
                <div className="h-[100vw] rounded-sm w-full flex justify-center items-center shadow-md bg-white">
                    <p className='text-black'>מלא סטטוס גוף כדי לראות את השינוי שלך</p>
                    <button></button>
                </div> )
            ) 
        }
        <button 
            disabled={!is_body_status}
            style={is_body_status ? {} : {opacity:'0.3'}}
            className="text-black bg-primary w-full p-1 rounded-sm mb-1">{"פרסם"}</button>
    </section>
  )
}
