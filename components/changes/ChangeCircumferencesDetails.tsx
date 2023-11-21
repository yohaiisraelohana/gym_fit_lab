"use client"
import ChevronDownIcon from '@/assets/icons/ChevronDownIcon';
import ChevronUpIcon from '@/assets/icons/ChevronUpIcon';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useState } from 'react'

export default function ChangeCircumferencesDetails(
    {before_circ_id , after_circ_id , setShowCirc , show_circ}:{
        after_circ_id:string | null;
        before_circ_id:string | null;
        show_circ:boolean;
        setShowCirc:(s:boolean)=>void;
    }) {
    const [is_circ_details , setIsCircDetails] = useState<boolean>(false);
    const [before_circ_details , setBeforeCircDetails] = useState<TBodycircumference | null>(null);
    const [after_circ_details , setAfterCircDetails] = useState<TBodycircumference | null>(null);
    const defaultData = "N/A";

    const getCirc = async ( ) => {
        if(!before_circ_id || !after_circ_id)
            return;
        const supabase = createClientComponentClient();
        const {data:brfore_circ_data , error:before_circ_error} = await supabase
            .from("circumferences")
            .select()
            .match({id:before_circ_id});
        const {data:after_circ_data , error:after_circ_error} = await supabase
            .from("circumferences")
            .select()
            .match({id:after_circ_id});
        if(!brfore_circ_data || before_circ_error || !after_circ_data || after_circ_error)
            return;
        setAfterCircDetails(after_circ_data[0]);
        setBeforeCircDetails(brfore_circ_data[0]);
        setIsCircDetails(true);
    }
  return (
    <>  { show_circ
        ? <button
            onClick={()=>setShowCirc(false)}
            className="w-full text-center flex justify-center items-center gap-1"
            ><ChevronUpIcon classNameStyle="h-4 w-4 " /> <p>היקפים</p> 
        </button>
        :
        <button 
            onClick={()=>{getCirc(); setShowCirc(true)}}
            className="w-full text-center flex justify-center items-center gap-1"
            ><ChevronDownIcon classNameStyle="h-4 w-4 " /> <p>היקפים</p> 
        </button>
        }
        {show_circ && is_circ_details 
            && after_circ_details
            && before_circ_details
            &&
            <div className="grid grid-cols-2 w-full gap-y-2">

                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{after_circ_details.neck || defaultData}</p>
                    <p>צוואר</p>
                </div>
                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{before_circ_details.neck || defaultData}</p>
                    <p>צוואר</p>
                </div>

                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{after_circ_details.shoulders || defaultData}</p>
                    <p>כתפיים</p>
                </div>
                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{before_circ_details.shoulders || defaultData}</p>
                    <p>כתפיים</p>
                </div>

                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{after_circ_details.chest || defaultData}</p>
                    <p>חזה</p>
                </div>
                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{before_circ_details.chest || defaultData}</p>
                    <p>חזה</p>
                </div>

                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{after_circ_details.waist || defaultData}</p>
                    <p>מותניים</p>
                </div>
                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{before_circ_details.waist || defaultData}</p>
                    <p>מותניים</p>
                </div>

                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{after_circ_details.right_arm || defaultData}</p>
                    <p>יד ימין</p>
                </div>
                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{before_circ_details.right_arm || defaultData}</p>
                    <p>יד ימין</p>
                </div>

                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{after_circ_details.left_arm || defaultData}</p>
                    <p>יד שמאל</p>
                </div>
                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{before_circ_details.left_arm || defaultData}</p>
                    <p>יד שמאל</p>
                </div>

                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{after_circ_details.right_leg || defaultData}</p>
                    <p>רגל ימין</p>
                </div>
                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{before_circ_details.right_leg || defaultData}</p>
                    <p>רגל ימין</p>
                </div>

                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{after_circ_details.left_leg || defaultData}</p>
                    <p>רגל שמאל</p>
                </div>
                <div className="flex w-full justify-center gap-1">
                    <p>ס״מ</p>
                    <p className="text-center">{before_circ_details.left_leg || defaultData}</p>
                    <p>רגל שמאל</p>
                </div>

            </div>
        }
    </>
  )
}
