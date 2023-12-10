import React from 'react'
import ChangeCard from '../changes/ChangeCard';

export default function TraineesChange(
    {changes}:{
        changes:TChange[];
    }) {
  return (
    <div className='w-full flex flex-col items-center gap-4 '>
        <h1 className="text-white text-3xl">שינויים של מתאמנים</h1>
        <div dir='rtl' className="grid grid-flow-col grid-rows-1 w-[90vw] gap-4 overflow-x-auto overflow-y-hidden h-fit">
            {changes.map((change , i) => (
                    <div dir='ltr' key={i} className="w-[60vw] sm:w-[50vw] md:w-[55vw] lg:w-[40vw] xl:w-[30vw] h-fit">
                        <ChangeCard 
                            change_card_style="h-[80vw] sm:h-[65vw] md:h-[40vw] lg:h-[30vw] xl:h-[22vw] w-full   bg-white shadow-md rounded-sm   relative   flex flex-col justify-between" 
                            change={change} />
                    </div>
            ))}
            {changes.map((change , i) => (
                    <div dir='ltr' key={i} className="w-[60vw] sm:w-[50vw] md:w-[55vw] lg:w-[40vw] xl:w-[30vw] h-fit">
                        <ChangeCard 
                            change_card_style="h-[80vw] sm:h-[65vw] md:h-[40vw] lg:h-[30vw] xl:h-[22vw] w-full   bg-white shadow-md rounded-sm   relative   flex flex-col justify-between" 
                            change={change} />
                    </div>
            ))}
        </div>

    </div>
  )
}
