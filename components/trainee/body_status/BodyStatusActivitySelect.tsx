import { activity_options } from '@/components/calculators/activityOptions';
import Select from '@/components/reusefull/Select';
import React from 'react'

export default function BodyStatusActivitySelect(
    {selected_activity , handleSelect}:{
        selected_activity:number;
        handleSelect:(e: React.ChangeEvent<HTMLSelectElement>) => void;
    }) {
  return (
    <div className="w-full">  
        <p className='w-full text-end'>רמת פעילות</p>
        <Select
            select_options={activity_options
                .map((option , ind ) => {
                    return {name : option.name , value : ind}
                })
            }
            selected_index={selected_activity}
            handleSelect={handleSelect}/>
    </div>
  )
}
