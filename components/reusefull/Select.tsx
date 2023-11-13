import React from 'react'

export default function Select(
  { select_options , selected_index , handleSelect }:{
    select_options : { name:string  , value:any } [] ;
    selected_index : any ;
    handleSelect : (e:React.ChangeEvent<HTMLSelectElement>) => void;
  }) {
  return (
    <>
        <select 
            onChange={(e)=>handleSelect(e)}
            className="text-end border border-background  md:hidden rounded-sm  block w-full p-1 ">
            {select_options
              .map((option,ind)=>(
                ind == selected_index
                ? <option key={ind} value={option.value} defaultValue={option.value}>{option.name}</option>
                : <option key={ind} value={option.value} >{option.name}</option>
            ))}
        </select>
        <select 
            onChange={(e)=> handleSelect(e)}
            multiple  
            className=" max-md:hidden border border-background  text-end rounded-sm focus:ring-[var(--primary)] focus:border-primary block w-full p-1 ">
            { select_options 
                .map((option,ind)=>(
                  ind == selected_index
                  ? <option key={ind} value={option.value} defaultValue={option.value}>{option.name}</option>
                  : <option key={ind} value={option.value} >{option.name}</option>
            ))}
        </select>
    </>
  )
}
