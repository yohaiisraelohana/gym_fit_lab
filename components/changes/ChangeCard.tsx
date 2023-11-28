"use client"

import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import ChangeCardDetails from './ChangeCardDetails';
import BeforeAndAfterChange from './BeforeAndAfterChange';
import ChangeCardOptions from './ChangeCardOptions';
import ChangeCardComments from './ChangeCardComments';
import ChangeCardLikes from './ChangeCardLikes';


export default function ChangeCard(
    { change ,  existChange , existProfile , change_card_style }:{
        change?:TChange ; 
        existChange?: TBodyStatus[] ;
        existProfile?: TUser ;
        change_card_style? : string;
    }) {
        const [before_change , setBeforeChange ] = useState<TBodyStatus | null>(null);
        const [after_change , setAfterChange ] = useState<TBodyStatus | null>(null);
        const [change_profile , setChangeProfile ] = useState<TUser | null>(null);
        const [ change_show  , setChangeShow ] = useState<string>("לפני");
        const [is_exist_change , setIsExistChange] = useState<boolean>(false);
       



        const getChange = async () => {
            const supabase = createClientComponentClient();
            const {data:before_data , error:before_error} = await supabase
                .from("body_status")
                .select()
                .match({id:change?.before_id});

            const {data:after_data , error:after_error} = await supabase
                .from("body_status")
                .select()
                .match({id:change?.after_id});
            
            const {data:profile_data , error:profile_error} = await supabase
                .from("profile")
                .select()
                .match({id:change?.trainee_id});
            
            if( !before_data  || before_data.length == 0 
            ||  !after_data   || after_data.length == 0 
            ||  !profile_data || profile_data.length == 0)
                return;

            setBeforeChange(before_data[0]);
            setAfterChange(after_data[0]);
            setChangeProfile(profile_data[0])
        }

        useEffect(()=>{
            if(existChange && existProfile){
                setBeforeChange(existChange[0]);
                setAfterChange(existChange[1]);
                setChangeProfile(existProfile);
                setIsExistChange(true);
            } else if (change) {
                getChange();
                //TODO: Get the changes from supabase
                //TODO: if the change length less chan 2 return a message without the change details 
                //TODO: also if the is no details about the profile of the change user
            }
        },[])
  return (
    <div className={change_card_style ||  ` 
        h-[107vw] w-full   bg-white shadow-md rounded-sm   relative   flex flex-col justify-between
        sm:h-[77vw]
        md:h-[55vw]
        lg:h-[43vw]`}>
        <p className='text top-1 right-2 bg-white/30 px-1 rounded-sm backdrop-blur-sm absolute md:hidden'>{change_show}</p>

        <BeforeAndAfterChange
            before_change={before_change}
            after_change={after_change}
            is_exist_change={is_exist_change}
            change_show={change_show} />
        
        <ChangeCardDetails 
            change={change}
            change_profile={change_profile} 
            before_change={before_change!} 
            after_change={after_change!}
            is_exist_change={is_exist_change}
            change_show={change_show} />
        
        <ChangeCardOptions 
            setChangeShow={setChangeShow}
            is_exist_change={is_exist_change}/>

        <ChangeCardComments 
            change_show={change_show}/>
        {change && 
            <ChangeCardLikes 
                change_id={change?.id!}
                change_show={change_show} />
        }
    </div>
  )
}
