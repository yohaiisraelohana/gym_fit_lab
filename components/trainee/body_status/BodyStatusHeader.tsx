import EditIcon from '@/assets/icons/EditIcon';
import MinusIcon from '@/assets/icons/MinusIcon';
import PlusIcon from '@/assets/icons/PlusIcon';
import React from 'react'

export default function BodyStatusHeader(
    {shown_details , setShownDetails}:{
        shown_details:string;
        setShownDetails: (d:string) => void;
    }) {
  return (
    <div className=" w-full flex justify-between items-center">
        <div className="flex gap-2">
            {shown_details == "הוספת סטטוס גוף" 
                ? <MinusIcon 
                    onClick={()=>setShownDetails("השינוי הנוכחי")}
                    classNameStyle="border border-white text h-5 w-5 cursor-pointer" /> 
                : <PlusIcon 
                    onClick={()=>setShownDetails("הוספת סטטוס גוף")}
                    classNameStyle="border border-white text h-5 w-5 cursor-pointer "/>
            }
            <EditIcon 
                onClick={()=>setShownDetails("רשימת סטטוסי גוף")}
                classNameStyle="h-5 w-5 border border-white text  cursor-pointer" />
        </div>
        <h1 className=" text-xl text">{shown_details}</h1>
    </div>
  )
}
