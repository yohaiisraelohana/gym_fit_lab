import Select from '@/components/reusefull/Select';
import React from 'react'
import { target_options } from '../target_options';

export default function BodyStatusTargetSelect(
    {handleSelectTarget , selected_target}:{
        selected_target:number;
        handleSelectTarget:(e: React.ChangeEvent<HTMLSelectElement>) => void;
    }) {
  return (
    <div className="w-full">
        <p className='w-full text-end'>מטרה נוכחית</p>
        <Select 
            select_options={target_options} 
            selected_index={selected_target} 
            handleSelect={handleSelectTarget}/>
    </div>
  )
}
